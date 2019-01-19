const humps = require('humps');
const _ = require('lodash');

module.exports = pgPool => {
    const orderedFor = (rows, collection, field) => {
        const data = humps.camelizeKeys(rows);
        const inGroupsOfField = _.groupBy(data, field)
        return collection.map(element => {
            const elementArray = inGroupsOfField[element];
            if (elementArray) {
                return elementArray[0];
            }
            return {};
        });
    }

    return {
        getUser(apiKey){
            return pgPool.query(`select * from users where api_key = $1`, [apiKey])
                .then(res => {
                    // return res.rows[0];
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getUserById(userId){
            return pgPool.query(`select * from users where id = $1`, [userId])
                .then(res => {
                    return humps.camelizeKeys(res.rows[0]);
                });
        },

        getUsersByIds(userIds){
            return pgPool.query(`select * from users where id = ANY($1)`, [userIds])
                .then(res => {
                    return orderedFor(res.rows, userIds, 'id');
                });
        },

        getContests(user){
            return pgPool.query(`
                select * from contests
                where created_by = $1
                `, [user.id]
            ).then( res => {
                return humps.camelizeKeys(res.rows);
            });
        },

        getNames(contest){
            return pgPool.query(`
                select * from names
                where created_by = $1
                `, [contest.id]
            ).then( res => {
                return humps.camelizeKeys(res.rows);
            });
        }
    }
}