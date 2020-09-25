const connectDB = require("./db")

module.exports  = {
    createCourse: async (root, {input}/* args.input */ )=>{
        const defaults ={
            teacher:"",
            topic:""
        } 

        const newCourse = Object.assign(defaults, input)
        let db =await  connectDB
        let course

        try {
            course= await db.collection("courses").insertOne(newCourse)
            newCourse= await course.insertedID
        } catch (err) {
            console.log(err);
        }
        return newCourse
    }
}


