const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const StudentModel = require('../models/StudentModel')

router.post('/create/student',(req,res)=>{
    const {password,stream} = req.body
    const firstName = req.body.firstName.trim()
    const lastName = req.body.lastName.trim()
    const email = req.body.email.trim()
    const institution = req.body.institution.trim()
    let Student = new StudentModel({
        firstName,lastName,email,institution,password,stream
    })
    StudentModel.find({email:email},(err,data)=>{
        if(err){
            console.log(err)
            res.json({ok:false,reason:'something went wrong'})
        }
        if(data===null || data===undefined || data.length===0){
            creation(Student,req,res)
        }
        else{
            res.json({ok:false,reason:'Email already in use'})
        }
    }) 
})

function creation(Student,req,res){
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            console.log(err)
            res.json({ok:false,reason:'Something went wrong'})
        }
        bcrypt.hash(Student.password,salt,(err,hash)=>{
            if(err){
                console.log(err)
                res.json({ok:false,reason:'Something went wrong'})
            }
            Student.password = hash
            Student.save(err=>{
                if(err){
                    console.log(err)
                    res.json({ok:false,reason:'Something went wrong'})
                }
                res.json({ok:true})
            })
        })
    })
}

module.exports = router