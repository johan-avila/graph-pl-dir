'use strict'

//No eliminamos GRAPHQL POR COMPLETO, SOLO NOS TRAEMOS Tools Para hacer la vida mas facil
const express = require('express')
const { config } = require('./config/config')
const { readFile, readFileSync }= require("fs")
const { join } = require("path")

const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema} = require('graphql-tools')

// Config Resolvers
const resolvers = require("./lib/resolvers")

//App
const app = express()
const port = config.port || 3000
// PORT//URI

// Definir Schema 
// Un schema es lo que me define que va a hacer mi API
////Leer archivo del schema
const typeDeFs = readFileSync(
    join(__dirname, "lib", "schema.graphql"),
    "utf-8"
)
const schema = makeExecutableSchema({
    typeDefs: typeDeFs,
    resolvers:  resolvers
})



// Middleware
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true // ES EL ENTORNO DE EJECUCION DE GRAPHQL QUE VAMOS A EJECUTAR
}))



app.listen(port, () => {
  console.log(`App listen on port ${port}`)
})
