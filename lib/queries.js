
const connectDb = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    getCourses: async () => {
    let db = connectDb
    let courses = []

    try {
      db = await connectDb
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      console.error(error)
    }

    return courses
  },
  getCourse: async (root, {_id }) => {
    let db
    let course

    try {
      db = await connectDb
      course = await db.collection('courses').findOne({
        _id: ObjectID(_id)
      })
      return course
    } catch (error) {
      console.error(error)
    }
    return course
  }
}