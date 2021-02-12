import { registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from './enums';

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
