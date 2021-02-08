import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { ProtrackRepository } from './protrack.repository';
import { ProtrackResolver } from './protrack.resolver';
import { ProtrackService } from './protrack.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProtrackRepository]),
    UserModule,
    ProjectModule,
  ],
  providers: [ProtrackResolver, ProtrackService],
})
export class ProtrackModule {}
