import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';
import { ProtrackEntity } from '../protrack/protrack.entity';
import { BaseEntity } from '../shared/entities/base.entity';
import { RoleEnum } from '../shared/enums';

@ObjectType('User')
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  @Field()
  social_id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsString()
  code?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  @IsString()
  allocation?: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  first_name: string;

  @Field({ nullable: true })
  full_name?: string;

  @Column()
  @Field()
  picture: string;

  @Column()
  @Field()
  email: string;

  @Column({ default: false })
  @Field()
  active: boolean;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CONTRIBUTOR,
  })
  @Field()
  role: RoleEnum;

  @ManyToMany((type) => ProjectEntity, (project) => project.users)
  @Field((type) => [ProjectEntity])
  projects: ProjectEntity[];

  @OneToMany((type) => ProtrackEntity, (protrack) => protrack.user, {
    cascade: ['update', 'insert'],
  })
  @Field((type) => [ProtrackEntity], { defaultValue: [] })
  protracks: ProtrackEntity[];
}
