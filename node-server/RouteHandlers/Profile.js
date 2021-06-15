const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const TeacherModel = require('../models/TeacherModel')
const StudentModel = require('../models/StudentModel')

router.get('/profile/:id',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined && req.headers.authorization !== ''){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                TeacherModel.findById(req.params.id,(err,lecturer)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    if(lecturer===null||lecturer===undefined||lecturer.length===0){
                        StudentModel.findById(decoded.userId,(err,student)=>{
                            if(err){
                                res.json({ok:false})
                            }
                            if(student===null||student===undefined||student.length===0){
                                res.json({ok:false})
                            }
                            else{
                                res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : false,data:student})
                            }
                        })
                    }
                    else{
                        res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : true,data:lecturer})
                    }
                })  
            }            
        })  
    }
    else{
        res.json({ok:false})
    }

})

module.exports = router