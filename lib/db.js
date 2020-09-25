const {config} = require("../config/config")
const {MongoClient} = require("mongodb");

//URI 
const USER = config.db_user; 
const PASSWORD= config.db_password;
const DB_NAME= config.db_name;

const mongoUri=`mongodb+srv://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${DB_NAME}?retryWrites=true&w=majority`;



let connection

async function connectDb(mongoURI, db_name){
    
    if(connection){
        return connection
    } else {
        let client
        try {
            client= await MongoClient.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

             connection = client.db(db_name)
        } catch (err) {
            console.error("Hay un error bro", err)
            process.exit(1)
        }

    }
    return connection
}



module.exports= connectDb(mongoUri, DB_NAME)