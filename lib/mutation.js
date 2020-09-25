const connectDB = require("./db")

const mutations = {
    createCourse:async (root, {input}/* args.input */ )=>{
        let db = connectDB
        try {
            await db.collection
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = mutations