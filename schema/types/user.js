const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require('graphql');

// const { { type: } = require(' }./../lib/util');
// const pgdb = require('../../database/pgdb');
// const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
    name: 'UserType',
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
        createdAt: { type: GraphQLString },
        contests: {
            type: new GraphQLList(ContestType),
            resolve(obj, args, { loaders }) {
                // return pgdb(pgPool).getContests(obj);
                return loaders.contestsForUserIds.load(obj.id);
            }
        },
        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, { loaders }, { fieldName }) {
                // return mdb(mPool).getCounts(obj, fieldName);
                return loaders.mdb.usersByIds.load(obj.id)
                    .then(res => res[fieldName]);
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, { loaders }, { fieldName }) {
                // return mdb(mPool).getCounts(obj, fieldName);
                return loaders.mdb.usersByIds.load(obj.id)
                    .then(res => res[fieldName]);
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, { loaders }, { fieldName }) {
                // return mdb(mPool).getCounts(obj, fieldName);
                return loaders.mdb.usersByIds.load(obj.id)
                    .then(res => res[fieldName]);
            }
        }
    }
})