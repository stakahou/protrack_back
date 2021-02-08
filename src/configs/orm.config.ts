import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as path from 'path';

const {
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
  migrationsRun,
  logging,
} = config.get('db');

export default {
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
  migrationsRun,
  logging,
  entities: [path.resolve(__dirname, '..', '**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '..', 'db/migration/**/*{.ts,.js}')],

  migrationsTableName: 'migrations_typeorm',

  cli: {
    migrationsDir: 'src/db/migration',
    entitiesDir: path.resolve(__dirname, 'src'),
  },
} as TypeOrmModuleOptions;
