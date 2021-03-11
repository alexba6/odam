
require('dotenv').config()
let pg = require('pg')
pg.defaults.ssl = true

module.exports = {
    development: {
        url: process.env.DATABASE_URL,
        dialect: "mysql"
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    },
}