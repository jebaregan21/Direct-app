const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const TeacherModel = require('../models/TeacherModel')
const StudentModel = require('../models/StudentModel')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')

router.get('/settings',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            if(decoded.admin===true){
                TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else{
                        res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : true,data:lecturer})
                    }
                })
            }
            else{
                StudentModel.findById(decoded.userId,(err,student)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else{
                        res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,admin : false,data:student})
                    }
                })
            }
        })
    }
    else{
        res.json({ok:false})
    }

})

router.post('/change/image',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            let formData = new formidable.IncomingForm()
            formData.maxFileSize = 5 * 1024 * 1024
            formData.parse(req,(err,field,files)=>{

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
                    const newImagePath = path.join(__dirname,`/../profile/${decoded.userId}.jpg`)
                    fs.rename(oldImagePath,newImagePath,err=>{
                        if(err){
                            res.json({ok:false,reason:'image has to be in jpg format'})
                        }
                        else{
                            res.json({ok:true})
                        }
                    })
                }
                catch(e){
                    fs.unlinkSync(path.join(__dirname,`../profile/${data._id}.jpg`), err=>{
                        if(err){
                            res.json({ok:false,reason:"Don't reload when uploading"})
                        }
                    })

                    res.json({ok:false,reason:'something went wrong when uploading'})
                }
                                
            })
        })
    }
    else{
        res.json({ok:false,reason:'Login to access settings'})
    }
})

router.post('/change/degree',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                let degree = req.body.degree.trim()
                if(decoded.admin===true){
                    TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            lecturer.degree = degree
                            lecturer.save(err=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                else{
                                    res.json({ok:true})
                                }
                            })
                        }
                    })
                }
                else{
                    res.json({ok:false,reason:'you are not a lecturer'})
                }
            }               
                                
        })
    }
    else{
        res.json({ok:false,reason:'Login to access settings'})
    }
})

router.post('/change/stream',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                let stream = req.body.stream.trim()
                if(decoded.admin===true){
                    TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            lecturer.stream = stream
                            lecturer.save(err=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                else{
                                    res.json({ok:true})
                                }
                            })
                        }
                    })
                }
                else{
                    StudentModel.findById(decoded.userId,(err,student)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            student.stream = stream
                            student.save(err=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                else{
                                    res.json({ok:true})
                                }
                            })
                        }
                    })
                }
            }               
                                
        })
    }
    else{
        res.json({ok:false,reason:'Login to access settings'})
    }
})

router.post('/change/institution',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                let institution = req.body.institution.trim()
                if(decoded.admin===true){
                    TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            lecturer.institution = institution
                            lecturer.save(err=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                else{
                                    res.json({ok:true})
                                }
                            })
                        }
                    })
                }
                else{
                    StudentModel.findById(decoded.userId,(err,student)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            student.institution = institution
                            student.save(err=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                else{
                                    res.json({ok:true})
                                }
                            })
                        }
                    })
                }
            }               
                                
        })
    }
    else{
        res.json({ok:false,reason:'Login to access settings'})
    }
})

router.post('/change/password',(req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let split = req.headers.authorization.split(' ')
        const token = split[1]
        jwt.verify(token,jwtPassword,(err,decoded)=>{
            if(err){
                res.json({ok:false})
            }
            else{
                let oldpassword = req.body.oldpassword
                let newpassword = req.body.newpassword
                if(decoded.admin===true){
                    TeacherModel.findById(decoded.userId,(err,lecturer)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            bcrypt.compare(oldpassword,lecturer.password,(err,success)=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                if(success===true){
                                    bcrypt.genSalt(10,(err,salt)=>{
                                        if(err){
                                            console.log(err)
                                            res.json({ok:false,reason:'Something went wrong'})
                                        }
                                        bcrypt.hash(newpassword,salt,(err,hash)=>{
                                            if(err){
                                                console.log(err)
                                                res.json({ok:false,reason:'Something went wrong'})
                                            }
                                            lecturer.password = hash
                                            lecturer.save(err=>{
                                                if(err){
                                                    console.log(err)
                                                    res.json({ok:false,reason:'Something went wrong'})
                                                }
                                                else{
                                                    res.json({ok:true})
                                                }
                                            })
                                        })
                                
                                    })
                                    
                                }
                                else{
                                    res.json({ok:false,reason:'Invalid credentials'})
                                }
                            })
                            
                        }
                    })
                }
                else{
                    StudentModel.findById(decoded.userId,(err,student)=>{
                        if(err){
                            res.json({ok:false,reason:'User not found'})
                        }
                        else{
                            bcrypt.compare(oldpassword,student.password,(err,success)=>{
                                if(err){
                                    res.json({ok:false,reason:'something went wrong'})
                                }
                                if(success===true){
                                    bcrypt.genSalt(10,(err,salt)=>{
                                        if(err){
                                            console.log(err)
                                            res.json({ok:false,reason:'Something went wrong'})
                                        }
                                        bcrypt.hash(newpassword,salt,(err,hash)=>{
                                            if(err){
                                                console.log(err)
                                                res.json({ok:false,reason:'Something went wrong'})
                                            }
                                            student.password = hash
                                            student.save(err=>{
                                                if(err){
                                                    console.log(err)
                                                    res.json({ok:false,reason:'Something went wrong'})
                                                }
                                                else{
                                                    res.json({ok:true})
                                                }
                                            })
                                        })
                                
                                    })
                                    
                                }
                                else{
                                    res.json({ok:false,reason:'Invalid credentials'})
                                }
                            })
                        }
                    })
                }
            }               
                                
        })
    }
    else{
        res.json({ok:false,reason:'Login to access settings'})
    }
})

module.exports = router

