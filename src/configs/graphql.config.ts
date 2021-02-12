import { GqlModuleOptions } from '@nestjs/graphql';
import * as config from 'config';
import { join } from 'path';

const configs = config.get('graphql');

export default {
  ...configs,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  installSubscriptionHandlers: true,
  context: ({ req, connection }) => {
    // console.log('req.headers :>> ', req.headers);
    // console.log('connection :>> ', connection);
    return connection ? { req: connection.context } : { headers: req.headers };
  },
} as GqlModuleOptions;
