// 'use strict'

const { graphql, buildSchema} = require("graphql");
const express =require("express")
const graphqlHttp =require("express-graphql")
const {config}= require("./config/config")

const app = express();
const port = config.port
// console.log(port); 


//PORT//URI

//Definir Schema inicial
//Un schema es lo que me define que va a hacer mi API
const Schema = buildSchema(`
    type Query {
        hello: String
        saludo: String
        phone: Int
    }
`);
//resolvers
const resolvers = {
    hello: () => {
        return "Hola mundo "
    },
    saludo: ()=>{
        return "Saludo al mundo"
    },
    phone: ()=>{
        return 554025145 //So
    }
}

//Ejecutar el query hello 
graphql(Schema, '{ phone }', resolvers)
    .then( data => {
      console.log(data);
    })
    .catch(err=> console.log(err))