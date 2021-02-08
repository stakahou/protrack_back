import { Global, Module } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
