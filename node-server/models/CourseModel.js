const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    lecturer : {
        type :String,
        required : true
    },
    stream : {
        type : String,
        required : true
    },
    students : {
        type : [String]
    },
    sessions : {
        type : [String]
    },
    description : {
        type : String,
        required : true
    },
    lecturerName : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('CourseModel',CourseSchema)