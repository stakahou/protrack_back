import { InputType, OmitType } from '@nestjs/graphql';
import { UserEntity } from '../user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  UserEntity,
  [
    'id',
    'created_at',
    'update_at',
    'active',
    'role',
    'full_name',
    'projects',
    'protracks',
  ] as const,
  InputType,
) {}
