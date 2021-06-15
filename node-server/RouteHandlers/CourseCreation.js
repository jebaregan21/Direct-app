const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const TeacherModel = require('../models/TeacherModel')
const CourseModel = require('../models/CourseModel')
const formidable = require('formidable')
const path = require('path')
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const fs = require('fs')

router.post('/create/course',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false,reason:'Something went wrong'})
                }
                else{
                   if(decoded.admin===true){
                        let formData = new formidable.IncomingForm()
                        formData.maxFileSize = 5 * 1024 * 1024
                        formData.parse(req,(err,field,files)=>{
                            if(err){
                                res.json({ok:false,reason:'something went wrong'})
                            }
                    
                            const title = field.title.trim()
                            const stream = field.stream
                            const description = field.description.trim()
                            
                            let Course = new CourseModel({
                                title,stream,description,lecturer : decoded.userId, lecturerName : decoded.firstName
                            })
                            Course.save((err,data)=>{
                                if(err){
                                    console.log(err)
                                    res.json({ok:false,reason:'Something went wrong'})
                                }
                                console.log(data)
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
                                    const newImagePath = path.join(__dirname,`/../courses/${data._id}.jpg`)
                                    fs.rename(oldImagePath,newImagePath,err=>{
                                        if(err){
                                            course.remove({},err=>{
                                                if(err){console.log(err)
                                                res.json({ok:false,reason:'image has to be in jpg format'})
                                            }
                                            })
                                        }
                                        TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                                            if(err){
                                                console.log(err)
                                                res.json({ok:false,reason:'Something went wrong'})
                                            }
                                            lecturer.courses.push(data._id)
                                            lecturer.save(err=>{
                                                if(err){
                                                    console.log(err)
                                                    res.json({ok:false,reason:'something went wrong'})
                                                }
                                                res.json({ok:true})
                                            })
                                        })
                                    })
                                }
                                catch(e){
                                    fs.unlinkSync(path.join(__dirname,`../courses/${data._id}.jpg`), err=>{
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
                   }
                   else{
                    res.json({ok:false,reason:'Students are not allowed to create courses'})
                    }
                } 
            })
        
    }
    else{
        res.json({ok:false,reason:'Try after logging in again'})
    }
    
    
})

module.exports = router