// Pool de Conecciones
// ORM
// Sequelize
// ORM = Object Realational Mapping

const connectDB = require("./db")
const {ObjectID} = require("mongodb")
const errorHandler = require('./errorHandler')


module.exports  = {
    // Courses
    createCourse: async (root, {input}/* args.input */ )=>{
        const defaults ={
            teacher:"",
            topic:""
        } 

        const newCourse = Object.assign(defaults, input)
        let db =await  connectDB
        let course

        try {
            course = await db.collection("courses").insertOne(newCourse)
            newCourse = await course.insertedID
        } catch (err) {
            errorHandler(err)
        }
        return newCourse
    },
    createStudent: async (root, { input })=>{
        let db = await connectDB
        let student
        
        try {
            student = await db.collection("students").insertOne(input)
            input._id = await student.insertedId
            
        } catch (err) {
            errorHandler(err)
        } 

        return input
    },
    editCourse:async(root, {_id, input})=>{
        let db = await connectDB;
        let course
        try {
            await db.collection("courses").updateOne(
                {_id:ObjectID(_id)},
                {$set: input}
            );
            course = db.collection("courses").findOne({_id:ObjectID(_id)});
                
        } catch (err) {
            errorHandler(err)
        }
        return course
    }, 
    editStudent:async (root, {_id, input})=>{
        let db = await connectDB;
        let student
        try {
            await db.collection("students").updateOne(
                {_id:ObjectID(_id)},
                {$set: input}
            );
            student = db.collection("students").findOne({_id:ObjectID(_id)});
                
        } catch (err) {
            errorHandler(err)
        }
        return student

    },
    // Añadir Persona a Course
    addPeople: async (root, {courseId, personId} )=>{
        let db = await connectDB
        let people
        let course  
        
        try {
            people = await db.collection("students").findOne({_id:ObjectID(personId)});
            course = await db.collection("courses").findOne({ _id:ObjectID(courseId) })

            if(!people || ! course){
                throw new Error("People or Course dont exist")
            } else {
                await db.collection("courses").updateOne(
                    { _id : ObjectID(courseId)},
                    { $addToSet: { people : ObjectID(personId) }   }
                )
            }
        } catch (err) { 
            errorHandler(err)
        }
        return course
    }

}   