import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import googleConfig from '../../configs/google.config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleTokenStrategy,
  'google',
) {
  constructor(private readonly authService: AuthService) {
    super(googleConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ) {
    const user = this.authService.validate(profile);

    done(null, user);
  }
}
