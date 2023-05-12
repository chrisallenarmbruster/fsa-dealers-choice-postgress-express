const pg = require("pg")
const client = new pg.Client("postgres://localhost/hr_mock")

client.connect()

module.exports = client
