import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { CreateProtrackInput } from './inputs/create-protrack.input';
import { ProtrackEntity } from './protrack.entity';
import { ProtrackRepository } from './protrack.repository';

@Injectable()
export class ProtrackService {
  constructor(
    private readonly protrackRepository: ProtrackRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async find(options?: FindOneOptions<ProtrackEntity> | number) {
    const found = await this.protrackRepository.findOne(options as any);
    if (!found) throw new NotFoundException();
    return found;
  }

  async findAll(options?: FindManyOptions<ProtrackEntity>) {
    return this.protrackRepository.find(options);
  }

  async create(
    contributorId: number,
    projectId: number,
    protrack: CreateProtrackInput,
  ) {
    const user = await this.userService.find(contributorId);
    const project = await this.projectService.find(projectId);

    const newProtrack = this.protrackRepository.create({
      ...protrack,
      user,
      project,
    });

    return this.protrackRepository.save(newProtrack);
  }
}
