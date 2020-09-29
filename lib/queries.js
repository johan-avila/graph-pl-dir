const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
    // Get Course
  getCourses: async () => {
    db = await connectDb
    let courses = []

    try {
      courses = await db.collection('courses').find().toArray()
    } catch (err) {
      errorHandler(err)
    }

    return courses
  },
  // Get one course
  getCourse: async (root, {_id }) => {
    let db = await connectDb
    let course

    try {
      course = await db.collection('courses').findOne({
        _id: ObjectID(_id)
      })
      return course
    } catch (err) {
      errorHandler(err)
    }
    return course
  },
  // Muchos Students
  getStudents: async () =>{
  
    let db = await connectDb;
    let students = []

    try {
      students = await db.collection('students').find({}).toArray()
    } catch (err) {
      errorHandler(err)
    }

    return students
  
  },
  // Un Student
  getStudent: async (root, {_id}) =>{
    const db = await connectDb;
    let student
    try {
     student = await db.collection('students').findOne({_id:ObjectID(_id)});
    
  } catch (err) {
    errorHandler(err)
  }  
    return student
    
  }
}