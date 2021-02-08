import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../user/user.entity';
import { CreateProjectInput } from './inputs/create-project.input';
import { UpdateProjectInput } from './inputs/update-project.input';
import { ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';

@Resolver((of) => ProjectEntity)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query((returns) => ProjectEntity)
  project(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.find(id);
  }

  @Query((returns) => [ProjectEntity])
  projects() {
    return this.projectService.findAll();
  }

  @Query((returns) => [UserEntity], { name: 'project_contributors' })
  contributorsByProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.findContributorsByProject(id);
  }

  @Mutation((returns) => ProjectEntity, { name: 'create_project' })
  createProject(@Args('data') createProjectInput: CreateProjectInput) {
    return this.projectService.create(createProjectInput);
  }

  @Mutation((returns) => ProjectEntity, { name: 'update_project' })
  updateProject(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(id, updateProjectInput);
  }

  @Mutation((returns) => ProjectEntity, { name: 'remove_project' })
  removeProject(@Args('id', { type: () => Int }) id: number) {
    return this.projectService.remove(id);
  }

  @Mutation((returns) => Boolean, { name: 'add_contributors' })
  addContributors(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('contributorIds', { type: () => [Int!]! }) contributorIds: number[],
  ) {
    return this.projectService.addContributors(projectId, contributorIds);
  }

  @Mutation((returns) => Boolean, { name: 'remove_contributors' })
  removeContributors(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('contributorIds', { type: () => [Int!]! }) contributorIds: number[],
  ) {
    return this.projectService.removeContributors(projectId, contributorIds);
  }
}
