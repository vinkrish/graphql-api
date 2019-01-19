const humps = require('humps');
const { orderedFor } = require('./../lib/util');

module.exports = pgPool => {
    return {
        getUserByApiKey(apiKey){
            return pgPool.query(`select * from users where api_key = $1`, [apiKey])
                .then(res => {
                    // return res.rows[0];
                    return humps.camelizeKeys(res.rows[0]);
                });
        },
        
        getUsersByApiKeys(apiKeys){
            return pgPool.query(`select * from users where api_key = ANY($1)`, [apiKeys])
                .then(res => {
                    return orderedFor(res.rows, apiKeys, 'apiKey', true);
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
                    return orderedFor(res.rows, userIds, 'id', true);
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

        getContestsForUserIds(userIds ){
            return pgPool.query(`
                select * from contests
                where created_by = ANY($1)
                `, [userIds]
            ).then( res => {
                return orderedFor(res.rows, userIds, 'createdBy', false);
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
        },

        getNamesForContestIds(contestIds){
            return pgPool.query(`
                select * from names
                where created_by = ANY($1)
                `, [contestIds]
            ).then( res => {
                return orderedFor(res.rows, contestIds, 'contestId', false);
            });
        }
    }
}