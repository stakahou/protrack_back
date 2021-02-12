import { InputType, OmitType } from '@nestjs/graphql';
import { ProtrackEntity } from '../protrack.entity';

@InputType()
export class CreateProtrackInput extends OmitType(
  ProtrackEntity,
  ['id', 'created_at', 'update_at', 'user'] as const,
  InputType,
) {}
