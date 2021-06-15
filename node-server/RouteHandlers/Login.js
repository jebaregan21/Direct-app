const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Students = require('../models/StudentModel')
const Lecturers = require('../models/TeacherModel')
const jwtPassword = require('../Additional/Password')

router.post('/login/student',(req,res)=>{
    const {email,password} = req.body
    Students.findOne({email},(err,student)=>{
        if(err){
            console.log(err)
            res.json({ok:false,reason:'something went wrong'})
        }
        if(student===null||student===undefined||student===[]){
            res.json({ok:false,reason:'username not found'})
        }
        else{
            bcrypt.compare(password,student.password,(err,success)=>{
                if(err){
                    res.json({ok:false,reason:'something went wrong'})
                }
                if(success===true){
                    const token = jwt.sign({userId : student._id, firstName : student.firstName, admin:false},jwtPassword,{
                        expiresIn : 43200 // 12hours
                    })
                    res.json({ok:true,token})
                }
                else{
                    res.json({ok:false,reason:'Invalid credentials'})
                }
            })
        }
    })
})

router.post('/login/lecturer',(req,res)=>{
    const {email,password} = req.body
    Lecturers.findOne({email},(err,Lecturer)=>{
        if(err){
            console.log(err)
            res.json({ok:false,reason:'something went wrong'})
        }
        if(Lecturer===null||Lecturer===undefined||Lecturer===[]){
            res.json({ok:false,reason:'username not found'})
        }
        else{
            bcrypt.compare(password,Lecturer.password,(err,success)=>{
                if(err){
                    res.json({ok:false,reason:'something went wrong'})
                }
                if(success===true){
                    const token = jwt.sign({userId : Lecturer._id, firstName : Lecturer.firstName, admin:true},jwtPassword,{
                        expiresIn : 43200 // 12hours
                    })
                    res.json({ok:true,token})
                }
                else{
                    res.json({ok:false,reason:'Invalid credentials'})
                }
            })
        }
    })
})

module.exports = router