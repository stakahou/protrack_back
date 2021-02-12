import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { RoleEnum } from '../shared/enums';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async find(options?: FindOneOptions<UserEntity> | number) {
    const found = await this.userRepository.findOne(options as any);
    if (!found) throw new NotFoundException();
    return found;
  }

  async findAll(options?: FindManyOptions<UserEntity>) {
    return this.userRepository.find(options);
  }

  async findContributors() {
    return this.userRepository.find({ where: { role: RoleEnum.CONTRIBUTOR } });
  }

  async getBySocialId(id: string) {
    return this.userRepository.findOne({ where: { social_id: id } });
  }

  async getProjects(id: number) {
    const { projects } = await this.find({
      where: { id },
      relations: ['projects'],
    });
    return projects;
  }

  async getProtracks(id: number) {
    const { protracks } = await this.find({
      where: { id },
      relations: ['protracks'],
    });
    return protracks;
  }

  async create(user: CreateUserInput) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: number, user: UpdateUserInput) {
    const u = await this.find(id);
    Object.assign(u, user);
    return this.userRepository.save(u);
  }

  async remove(id: number) {
    const user = await this.find(id);
    await this.userRepository.remove(user);
    return user;
  }
}
