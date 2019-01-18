const humps = require('humps');

module.exports = pgPool => {
    return {
        getUser(apiKey){
            return pgPool.query(`select * from users where api_key = $1`, [apiKey])
                .then(res => {
                    // return res.rows[0];
                    return humps.camelizeKeys(res.rows[0]);
                });
        }
    }
}