import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProjectEntity } from '../project/project.entity';
import { ProtrackEntity } from '../protrack/protrack.entity';
import { UpdateUserInput } from './inputs/update-user.input';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => UserEntity)
  contributor(@Args('id', { type: () => Int }) id: number) {
    return this.userService.find(id);
  }

  @Query((returns) => [UserEntity])
  contributors() {
    return this.userService.findContributors();
  }

  @Mutation((returns) => UserEntity, { name: 'update_contributor' })
  updateContributor(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @ResolveField()
  full_name(@Parent() { first_name, last_name }) {
    return `${first_name} ${last_name}`;
  }

  @ResolveField((returns) => [ProjectEntity])
  projects(@Parent() { id }) {
    return this.userService.getProjects(id);
  }

  @ResolveField((returns) => [ProtrackEntity])
  protracks(@Parent() { id }) {
    return this.userService.getProtracks(id);
  }
}
