const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const pgdb = require('../database/pgdb');

const UserType = require('./types/user');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        hello: {
            type: GraphQLString,
            description: 'The *mandatory* hello world example, GraphQL style',
            resolve: () => 'world'
        },
        me: {
            type: UserType,
            description: 'The current user identified by an api key',
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (obj, args, { loaders }) => {
                // Read user information from database
                // return pgdb(pgPool).getUserByApiKey(args.key)
                return loaders.usersByApiKeys.load(args.key);
            }
        }
    }
})

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    // mutation: ...
})

module.exports = ncSchema;