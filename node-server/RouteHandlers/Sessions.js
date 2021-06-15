const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const CourseModel = require('../models/CourseModel')
const SessionModel = require('../models/SessionModel')
const jwtPassword = require('../Additional/Password')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

router.get('/sessions/:id',(req,res)=>{
    const id = req.params.id
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                CourseModel.findById(id,(err,course)=>{
                    if(err){
                        console.log(err)
                        res.json({ok:false})
                    }
                    SessionModel.find({course:id},(err,sessions)=>{
                        if(err){
                            console.log(err)
                            res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : false})
                        }
                        if(decoded.userId===course.lecturer){
                            res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,sessions,admin : decoded.admin})
                        }
                        else{
                            res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,sessions,admin : false})
                        }
                        
                    })
                })
            }
        })
        
    }
    else{
        res.json({ok : false})
    }
})

router.post('/sessions/:id',(req,res)=>{
    const id = req.params.id
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false,reason:'Try after logging in again'})
            }
            else{
                CourseModel.findById(id,(err,course)=>{
                    if(err){
                        console.log(err)
                        res.json({ok:false,reason:'course not found'})
                    }
                   
                    if(decoded.userId===course.lecturer){
                        let formData = new formidable.IncomingForm()
                        formData.maxFileSize = 5 * 1024 * 1024 * 1024
                        formData.parse(req,(err,fields,files)=>{
                            const title = fields.title.trim()
                            const description = fields.description

                            const Session = new SessionModel({
                                title,
                                description,
                                course:id
                            })
                            Session.save((err,data) =>{
                                if(err){
                                    console.log(err)
                                    res.json({ok:false,reason:'something went wrong'})
                                }

                                try{
                                    if(files.video.size == 0  || files.video === undefined ){
                                        data.remove({},(err,product)=>{
                                            if(err){console.log(err)}
                                            res.json({ok:false,reason:'Upload a proper file'})
                                        })
                                        return
                                    }
                                    const oldVideoPath = files.video.path
                                    const newVideoPath = path.join(__dirname,`../videos/${data._id}.mp4`)
                                    fs.rename(oldVideoPath,newVideoPath,(err)=>{
                                        if(err){
                                            data.remove({},err=>{
                                                if(err){console.log(err)
                                                    res.json({ok:false,reason:'something went wrong'})
                                                }
                                            })
                                            res.json({ok:false,reason:'something went wrong'})
                                        }
                                        course.sessions.push(data._id)
                                        course.save(err=>{
                                            if(err){
                                                data.remove({},err=>{
                                                    if(err){console.log(err)
                                                        res.json({ok:false,reason:'something went wrong'})
                                                    }
                                                })
                                            }
                                            else{
                                                res.json({ok:true})
                                            }
                                        })
                                    })

                                }
                                catch(e){
                                    data.remove({},(err,product)=>{
                                        if(err){console.log(err)
                                            res.json({ok:false,reason:'something went wrong'})
                                        }
                                    })
                                    // fs.unlinkSync(path.join(__dirname,`../videos/${data._id}.mp4`), err=>{if(err){
                                        
                                    //     res.json({ok:false,reason:"Don't reload the page while uploading"})
                                    // }})
                                    
                                }
                                
                            })
                    
                        })
                    }
                    else{
                        res.json({ok:false,reason:'You are not the lecturer of this course'})
                    }
                        
                })
            }
        })
        
    }
    else{
        res.json({ok : false,reason:'Login first'})
    }
})

module.exports = router