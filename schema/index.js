const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        hello: {
            type: GraphQLString,
            description: 'The *mandatory* hello world example, GraphQL style',
            resolve: () => 'world'
        }
    }
})

const ncSchema = new GraphQLSchema({
    query: RootQueryType
    // mutation: ...
})

module.exports = ncSchema;