import { InputType, OmitType } from '@nestjs/graphql';
import { ProjectEntity } from '../project.entity';

@InputType()
export class CreateProjectInput extends OmitType(
  ProjectEntity,
  ['id', 'created_at', 'update_at'] as const,
  InputType,
) {}
