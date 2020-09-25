//Remove Mock
const connectDb = require("./db");
const {ObjectID} = require("mongodb")

const resolvers = {
    Query:{
        getCourses: async () => {
            let db = await connectDb
            let courses = []
            
            try {
                courses = await db.collection("courses").find().toArray()
            } catch (err) {
                console.log(err);
            }
        
            return courses
        },

        getCourse:async (root, {_id})=>{
            let db = await connectDb
            let course
            try {
                course = await db.collection("courses").findOne({
                    _id: ObjectID   (_id)
                })
            } catch (err) {
                console.log(err);
            }
            return course
        }
    },
    
}

module.exports = resolvers