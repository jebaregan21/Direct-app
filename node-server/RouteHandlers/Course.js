const router = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const CourseModel = require('../models/CourseModel')
const StudentModel = require('../models/StudentModel')
const TeacherModel = require('../models/TeacherModel')

router.get('/course/:id',(req,res)=>{
    const id = req.params.id
    CourseModel.findById(id,(err,course)=>{
        if(err){
            console.log(err)
            res.json({ok:false,course:[]})
        }
        if(req.headers.authorization !== null && req.headers.authorization !== undefined){
            let split = req.headers.authorization.split(' ')
            const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false,course})
                }
                else{
                    if(decoded.admin===false){
                        StudentModel.findById(decoded.userId,(err,student)=>{
                            if(err){
                                console.log(err)
                                res.json({ok:false,course})
                            }
                            const bool = student.courses.includes(id)
                            if(bool===true)
                                res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,course,registered:true})
                            else
                                res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,course,registered:false})
                        })
                    }
                    else{
                        if(decoded.userId === course.lecturer){
                            res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,course,registered:true})
                        }
                        else{
                            res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,course,registered:false})
                        }
                    }
                    
                }
            })
        }
        else{
            res.json({ok : false,course})
        }
    })
    
})

router.post('/course/:id',(req,res)=>{
    const id = req.params.id
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
    let split = req.headers.authorization.split(' ')
    const token = split[1]
    jwt.verify(token,jwtPassword,(err,decoded)=>{
        if(err){
            res.json({ok:false,reason:'Try after logging in again'})
        }
        if(decoded.admin===true){
            res.json({ok:false,reason:'Lecturer cannot register for courses'})
        }
        else{
            StudentModel.findById(decoded.userId,(err,student)=>{
                if(err){
                    res.json({ok:false,reason:'Something went wrong'})
                }
                student.courses.push(id)
                student.save(err=>{
                    if(err){
                        res.json({ok:false,reason:'Something went wrong'})  
                    }
                    CourseModel.findById(id,(err,course)=>{
                        if(err){
                            res.json({ok:false,reason:'Something went wrong'})
                        }
                        course.students.push(decoded.userId)
                        course.save(err=>{
                            if(err){
                                res.json({ok:false,reason:'Something went wrong'})
                            }
                            res.json({ok:true})
                        })
                    })
                })
            })
        }
    })
    }else{
        res.json({ok:false,reason:'Login first to register'})
    }
})

module.exports = router