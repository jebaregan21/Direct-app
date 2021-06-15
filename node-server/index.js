const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const port = process.env.PORT || 8000

//db connection

mongoose.connect('mongodb://127.0.0.1:27017/trial', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', ()=>{
    console.log('Connect with DB')
}).on('error', err =>{
    console.log(`An error has occured : ${err}`)
})


//cors
let corsOptions = {
    origin : 'http://localhost:3000',
    methods : ['POST','GET','DELETE'],
    credentials : true
}
app.use(cors(corsOptions))

const Home = require('./RouteHandlers/Home')
const StudentCreation = require('./RouteHandlers/StudentCreation')
const LeacturerCreation = require('./RouteHandlers/LecturerCreation')
const Login = require('./RouteHandlers/Login')
const MyCourses = require('./RouteHandlers/MyCourses')
const CourseCreation = require('./RouteHandlers/CourseCreation')
const Course = require('./RouteHandlers/Course')
const Sessions = require('./RouteHandlers/Sessions')
const Video= require('./RouteHandlers/Video')
const Profile = require('./RouteHandlers/Profile')
const Settings = require('./RouteHandlers/Settings')

app.use('/cimage/',express.static('./courses'))
app.use('/pimage/',express.static('./profile'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Home)
app.use(Login)
app.use(StudentCreation)
app.use(LeacturerCreation)
app.use(MyCourses)
app.use(CourseCreation)
app.use(Course)
app.use(Sessions)
app.use(Video)
app.use(Profile)
app.use(Settings)

app.listen(port,()=>{
    console.log("App is successfully deployed in port:",port)
})