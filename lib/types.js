// RESOLVERS PARA LOS NESTED TYPES, TYPES DENTRO D EOTROS TYPES, FORMAS DE RELACIONARLO

const connectDB= require("./db")
const { ObjectID } = require("mongodb")

module.exports= {
    Course:{
        people: async ({people} /* = course.people */) => {
            let db = await connectDB
            let peopleData 
            let ids 
            try {
                ids = people ? people.map(_id=> _id) : []
            
                peopleData= ids.length > 0 ? db.collection("students").find(
                    {_id : { $in : ids}}
                ).toArray() 
                : []  
            } catch (err) {
                console.log(err);
            }
            return peopleData    
        }
    }
}