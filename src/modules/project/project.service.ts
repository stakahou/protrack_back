import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, In } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { ProjectEntity } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userService: UserService,
  ) {}

  async find(options: number | FindOneOptions<ProjectEntity>) {
    const found = await this.projectRepository.findOne(options as any);
    if (!found) throw new NotFoundException();
    return found;
  }

  async findAll(options?: FindManyOptions<ProjectEntity>) {
    return this.projectRepository.find(options);
  }

  async create(project: CreateProjectInput) {
    const newProject = this.projectRepository.create(project);
    return this.projectRepository.save(newProject);
  }

  async update(id: number, project: UpdateProjectInput) {
    const p = await this.find(id);
    Object.assign(p, project);
    return this.projectRepository.save(p);
  }

  async remove(id: number) {
    const project = await this.find(id);
    await this.projectRepository.remove(project);
    return project;
  }

  async findContributorsByProject(id: number) {
    const { users } = await this.projectRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    return users;
  }

  async addContributors(projectId: number, contributorIds: number[]) {
    const project = await this.find({
      where: { id: projectId },
      relations: ['users'],
    });

    const contributors = await this.userService.findAll({
      where: { id: In(contributorIds) },
    });

    project.users = [...project.users, ...contributors];

    return await !!this.projectRepository.save(project);
  }

  async removeContributors(projectId: number, contributorIds: number[]) {
    const project = await this.find({
      where: { id: projectId },
      relations: ['users'],
    });

    project.users = project.users.filter(
      ({ id }) => !contributorIds.includes(id),
    );

    return await !!this.projectRepository.save(project);
  }
}
