import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ProtrackEntity } from '../protrack/protrack.entity';
import { BaseEntity } from '../shared/entities/base.entity';
import { UserEntity } from '../user/user.entity';

@ObjectType('Project')
@Entity({ name: 'project' })
export class ProjectEntity extends BaseEntity {
  @Column()
  @Field()
  @IsString()
  name: string;

  @ManyToMany((type) => UserEntity, (user) => user.projects)
  @JoinTable({
    name: 'projects_users',
    joinColumn: { name: 'project_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  @OneToMany((type) => ProtrackEntity, (protrack) => protrack.project)
  protracks: ProtrackEntity[];
}
