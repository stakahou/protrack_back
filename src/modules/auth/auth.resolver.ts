import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Google } from '../../decorators/google.decorator';
import { User } from '../../decorators/user.decorator';
import { AuthService } from './auth.service';
import { AuthType } from './types/auth.type';

@Resolver((of) => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Google()
  @Mutation((returns) => AuthType)
  async googleLogin(@Args('access_token') access_token: string, @User() user) {
    return this.authService.createToken(user);
  }
}
