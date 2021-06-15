const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const TeacherModel = require('../models/TeacherModel')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

router.post('/create/lecturer',(req,res)=>{
    let formData = new formidable.IncomingForm()
    formData.maxFileSize = 20 * 1024 * 1024
    formData.parse(req,(err,field,files)=>{
        const {password,stream} = field
        const firstName = field.firstName.trim()
        const lastName = field.lastName.trim()
        const email = field.email.trim()
        const institution = field.institution.trim()
        const degree = field.degree.trim()
        
        let Teacher = new TeacherModel({
            firstName,lastName,email,institution,password,stream,degree
        })
        TeacherModel.find({email:email},(err,data)=>{
            if(err){
                console.log(err)
                res.json({ok:false,reason:'something went wrong'})
            }
            if(data===null || data===undefined || data.length===0){
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err){
                        console.log(err)
                        res.json({ok:false,reason:'Something went wrong'})
                    }
                    bcrypt.hash(Teacher.password,salt,(err,hash)=>{
                        if(err){
                            console.log(err)
                            res.json({ok:false,reason:'Something went wrong'})
                        }
                        Teacher.password = hash
                        Teacher.save((err,data)=>{
                            if(err){
                                console.log(err)
                                res.json({ok:false,reason:'Something went wrong'})
                            }
                            try{
                                if(files.image.size===0 || files.image === undefined){
                                    data.remove({},err=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        res.json({ok:false,reason:'upload an image'})
                                    })
                                }
                                const oldImagePath = files.image.path
                                const newImagePath = path.join(__dirname,`/../profile/${data._id}.jpg`)
                                fs.rename(oldImagePath,newImagePath,err=>{
                                    if(err){
                                        console.log(err)
                                        data.remove({},(err,product)=>{
                                            if(err){console.log(err)
                                            res.json({ok:false,reason:'image has to be in jpg format'})
                                        }
                                        })
                                    }
                                    res.json({ok:true})
                                })
                            }
                            catch(e){
                                fs.unlinkSync(path.join(__dirname,`../profile/${data._id}.jpg`), err=>{
                                    if(err){
                                        res.json({ok:false,reason:"Don't reload when uploading"})
                                    }
                                })
                                data.remove({},(err,product)=>{
                                    if(err){console.log(err); return}
                                })
                                res.json({ok:false,reason:'something went wrong when uploading'})
                            }
                        })
                    })
                })
            }
            else{
                res.json({ok:false,reason:'Email already in use'})
            }
        }) 
    })
    
})

module.exports = router