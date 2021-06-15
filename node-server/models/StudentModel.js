const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    institution : {
        type : String,
        required : true
    },
    stream : {
        type : String,
        required : true
    },
    courses : {
        type : [String]
    }
})

module.exports = mongoose.model('StudentModel',StudentSchema)