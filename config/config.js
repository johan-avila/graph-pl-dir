require("dotenv").config()

const config = {
    port: process.env.PORT,
    uri: process.env.URI
}

module.exports = {
config
}