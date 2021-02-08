import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import { BaseEntity } from '../shared/entities/base.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType('Protrack')
@Entity({ name: 'protrack' })
export class ProtrackEntity extends BaseEntity {
  @Column()
  @Field()
  @IsString()
  issue: string;

  @Column()
  @Field()
  @IsString()
  description: string;

  @ManyToOne((type) => UserEntity, (user) => user.protracks)
  @JoinTable({ name: 'user_id' })
  @Field((type) => UserEntity)
  user: UserEntity;

  @ManyToOne((type) => ProjectEntity, (project) => project.protracks)
  @JoinTable({ name: 'project_id' })
  project: ProjectEntity;
}
