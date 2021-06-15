const mongoose = require('mongoose')

const SessionSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    course:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('SessionModel',SessionSchema)