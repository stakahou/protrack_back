import * as config from 'config';
import { StrategyOptions } from 'passport-google-token';

const configs = config.get('google');

export default {
  ...configs,
} as StrategyOptions;
