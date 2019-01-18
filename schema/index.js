const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const MeType = require('./types/me');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        hello: {
            type: GraphQLString,
            description: 'The *mandatory* hello world example, GraphQL style',
            resolve: () => 'world'
        },
        me: {
            type: MeType,
            description: 'THe current user identified by an api key',
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: () => {
                // Read user information from database
            }
        }
    }
})

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    // mutation: ...
})

module.exports = ncSchema;