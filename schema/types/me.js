const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

// const { { type: } = require(' }./../lib/util');

module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID },
        // firstName: { 
        //     type: GraphQLString,
        //     resolve: obj => obj.first_name
        // },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },
        email: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString }
    }
})