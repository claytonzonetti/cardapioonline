const { Pool } = require("pg")  //com o pull ele loga só uma vez e não entas as requisições

module.exports = new Pool({
    user: 'postgres',
    password: "Zonetti19",
    host: "launchstore.ckk7kdz013d5.us-east-2.rds.amazonaws.com",
    port: 5432,
    database: "launchstoredb"
})

