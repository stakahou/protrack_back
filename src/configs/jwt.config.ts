import { JwtModuleOptions } from '@nestjs/jwt';
import * as config from 'config';

const { secret, expiresIn } = config.get('auth');

export default {
  secret,
  signOptions: { expiresIn },
} as JwtModuleOptions;
