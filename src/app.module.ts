import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import graphqlConfig from './configs/graphql.config';
import ormConfig from './configs/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ProtrackModule } from './modules/protrack/protrack.module';
import { PubSubModule } from './modules/pub-sub/pub-sub.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot(graphqlConfig),
    UserModule,
    AuthModule,
    ProjectModule,
    ProtrackModule,
    PubSubModule,
  ],
})
export class AppModule {}
