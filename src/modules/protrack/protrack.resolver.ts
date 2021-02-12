import { Inject } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { Event } from '../shared/events.enum';
import { CreateProtrackInput } from './inputs/create-protrack.input';
import { ProtrackEntity } from './protrack.entity';
import { ProtrackService } from './protrack.service';

@Auth()
@Resolver((of) => ProtrackEntity)
export class ProtrackResolver {
  constructor(
    private readonly protrackService: ProtrackService,
    @Inject('PUB_SUB') private readonly pubSub: PubSubEngine,
  ) {}

  @Query((returns) => ProtrackEntity)
  protrack(@Args('id', { type: () => Int }) id: number) {
    return this.protrackService.find(id);
  }

  @Query((returns) => [ProtrackEntity])
  protracks(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('week', { type: () => Int }) week: number,
    @Args('year', { type: () => Int }) year: number,
    @User('id') userId,
  ) {
    return this.protrackService.findAll({
      where: {
        week,
        year,
        project: projectId,
        user: userId,
      },
    });
  }

  @Mutation((returns) => [ProtrackEntity], { name: 'add_protrack' })
  async addProtrack(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('protracks', { type: () => [CreateProtrackInput] })
    protracks: CreateProtrackInput[],
    @User('id') userId,
  ) {
    const newProtrack = await this.protrackService.create(
      userId,
      projectId,
      protracks,
    );

    this.pubSub.publish(Event.PROTRACK_ADDED, {
      [Event.PROTRACK_ADDED]: newProtrack,
    });

    return newProtrack;
  }

  @Subscription((returns) => ProtrackEntity, {
    name: Event.PROTRACK_ADDED,
    filter: (payload, variables) => {
      return payload[Event.PROTRACK_ADDED].project.id === variables.projectId;
    },
  })
  async protrackAddedHandler(
    @Args('projectId', { type: () => Int }) projectId: number,
  ) {
    return this.pubSub.asyncIterator(Event.PROTRACK_ADDED);
  }
}
