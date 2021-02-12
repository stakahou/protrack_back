import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsPositive, IsString, Min } from 'class-validator';
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

  @Column()
  @Field((type) => Int)
  @IsPositive()
  week: number;

  @Column()
  @Field((type) => Int)
  @IsPositive()
  @Min(2020)
  year: number;

  @ManyToOne((type) => UserEntity, (user) => user.protracks, {
    nullable: false,
  })
  @JoinTable({ name: 'user_id' })
  @Field((type) => UserEntity)
  user: UserEntity;

  @ManyToOne((type) => ProjectEntity, (project) => project.protracks, {
    nullable: false,
  })
  @JoinTable({ name: 'project_id' })
  project: ProjectEntity;
}
