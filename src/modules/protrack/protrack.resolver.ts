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
import { Event } from '../shared/events.enum';
import { CreateProtrackInput } from './inputs/create-protrack.input';
import { ProtrackEntity } from './protrack.entity';
import { ProtrackService } from './protrack.service';

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
  protracks() {
    return this.protrackService.findAll();
  }

  @Mutation((returns) => ProtrackEntity, { name: 'add_protrack' })
  async addProtrack(
    @Args('contributorId', { type: () => Int }) contributorId: number,
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('protrack') protrack: CreateProtrackInput,
  ) {
    const newProtrack = await this.protrackService.create(
      contributorId,
      projectId,
      protrack,
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
