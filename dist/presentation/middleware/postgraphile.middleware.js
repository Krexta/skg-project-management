// cSpell:word graphile inflector errcode graphiql setof trackerql
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { PgEntityKind } from "graphile-build-pg";
import { makePgSmartTagsPlugin } from "graphile-utils/node8plus/makePgSmartTagsPlugin.js";
import { postgraphile } from "postgraphile";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { AppConfig } from "../../utility/index.js";
const SmartTagsPlugin = makePgSmartTagsPlugin([
    {
        kind: PgEntityKind.CLASS,
        match: '_prisma_migrations',
        tags: {
            omit: 'read,update,create,delete,all,many'
        }
    },
    {
        kind: PgEntityKind.CLASS,
        match: 'Event',
        tags: {
            omit: 'read,update,create,delete,all,many'
        }
    }
]);
const development_options = {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    showErrorStack: 'json',
    extendedErrors: [
        'hint',
        'detail',
        'errcode'
    ],
    appendPlugins: [
        PgSimplifyInflectorPlugin,
        SmartTagsPlugin,
        ConnectionFilterPlugin
    ],
    exportGqlSchemaPath: 'doc/graphql/schema.graphql',
    graphiql: true,
    enhanceGraphiql: true,
    enableQueryBatching: true,
    legacyRelations: 'omit',
    disableDefaultMutations: true,
    graphqlRoute: '/projectql'
};
const production_options = {
    subscriptions: true,
    retryOnInitFail: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    extendedErrors: [
        'errcode'
    ],
    appendPlugins: [
        PgSimplifyInflectorPlugin,
        SmartTagsPlugin,
        ConnectionFilterPlugin
    ],
    graphiql: false,
    enableQueryBatching: true,
    disableQueryLog: true,
    legacyRelations: 'omit',
    disableDefaultMutations: true,
    graphqlRoute: '/projectql'
};
export const middleware = postgraphile(process.env.DATABASE_URL, 'public', AppConfig.switchGraphileConfig(development_options, production_options));

//# sourceMappingURL=postgraphile.middleware.js.map