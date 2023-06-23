const Pool = require('pg').Pool;

const pool = new Pool({
    user: "saul",
    password: "S@ulito2929",
    host: "localhost",
    port: 5432,
    database: "songs"
});

module.exports = pool;