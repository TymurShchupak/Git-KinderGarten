const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'KinderGarden',
    password: 't9200221',
    port: 54321,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}