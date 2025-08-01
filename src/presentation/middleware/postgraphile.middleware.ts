// cSpell:word graphile inflector errcode graphiql setof projectql
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';
import { postgraphile } from 'postgraphile';
import { makePgSmartTagsFromFilePlugin } from 'postgraphile/plugins.js';

import { AppConfig } from 'src/utility';

const SmartTagsPlugin = makePgSmartTagsFromFilePlugin(
  'src/../postgraphile.tags.json',
);

const development_options = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  showErrorStack: 'json' as const,
  extendedErrors: ['hint', 'detail', 'errcode'],
  appendPlugins: [PgSimplifyInflectorPlugin, SmartTagsPlugin],
  exportGqlSchemaPath: 'doc/graphql/schema.graphql',
  graphiql: true,
  enhanceGraphiql: true,
  enableQueryBatching: true,
  legacyRelations: 'omit' as const,
  disableDefaultMutations: true, // Mutationを自動生成しない
  graphqlRoute: '/projectql',
};

const production_options = {
  subscriptions: true,
  retryOnInitFail: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  extendedErrors: ['errcode'],
  appendPlugins: [PgSimplifyInflectorPlugin, SmartTagsPlugin],
  graphiql: false,
  enableQueryBatching: true,
  disableQueryLog: true,
  legacyRelations: 'omit' as const,
  disableDefaultMutations: true, // Mutationを自動生成しない
  graphqlRoute: '/projectql',
};

export const middleware = postgraphile(
  process.env.DATABASE_URL,
  'public',
  AppConfig.switchGraphileConfig(development_options, production_options),
);
