import { GqlModuleOptions } from '@nestjs/graphql';
import * as config from 'config';
import { join } from 'path';

const configs = config.get('graphql');

export default {
  ...configs,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  installSubscriptionHandlers: true,
  context: ({ req, connection }) =>
    connection ? { req: connection.context } : { req },
} as GqlModuleOptions;
