const router = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const CourseModel = require('../models/CourseModel')
const StudentModel = require('../models/StudentModel')
const TeacherModel = require('../models/TeacherModel')

router.get('/mycourses',(req,res)=>{
        if(req.headers.authorization !== null && req.headers.authorization !== undefined){
            let split = req.headers.authorization.split(' ')
            const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false,courses:[]})
                }
                else{
                    if(decoded.admin===true){
                        CourseModel.find({lecturer:decoded.userId},(err,courses)=>{
                            if(err){
                                console.log(err)
                                res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : decoded.admin,courses:[]})
                            }
                            res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,courses,admin : decoded.admin})
                        })
                    }
                    else{
                        CourseModel.find({students: decoded.userId},(err,courses)=>{
                            if(err){
                                console.log(err)
                                res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,admin : decoded.admin})
                            }
                            res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,courses,admin : decoded.admin})
                        })
                    }
                }
            })
            
        }
        else{
            res.json({ok : false,courses:[]})
        }
     
})

module.exports = router