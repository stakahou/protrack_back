import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/jwt-auth.guard';

// export const Auth = (...roles: RoleEnum[]) => {
//   return applyDecorators(
//     SetMetadata('roles', roles),
//     UseGuards(JwtAuthGuard, RolesGuard),
//     ApiBearerAuth(),
//     ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//   );
// };

export const Auth = (...roles: []) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(
      GqlAuthGuard,
      // RolesGuard
    ),
  );
};
