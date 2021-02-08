import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType()
export abstract class BaseEntity {
  @IsOptional()
  @IsInt()
  @PrimaryGeneratedColumn()
  @Field((type) => Int, { nullable: true })
  id?: number;

  @CreateDateColumn()
  @Field((type) => Date)
  created_at: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  update_at: Date;
}
