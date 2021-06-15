const router = require('express').Router()
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')
const CourseModel = require('../models/CourseModel')

router.get('/',(req,res)=>{
    
    CourseModel.find({},(err,courses)=>{
        if(err){
            console.log(err)
            res.json(err)
        }
        if(req.headers.authorization !== null && req.headers.authorization !== undefined){
            let split = req.headers.authorization.split(' ')
            const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false,courses})
                }
                else{
                    res.json({ok:true, firstName : decoded.firstName, userId : decoded.userId,courses})
                }
            })
        }
        else{
            res.json({ok : false,courses})
        }
    }).limit(12).lean()
    
})

router.post('/search/filter',(req,res)=>{
    let {lecturer,stream} = req.body
    stream = (stream==='Choose stream')?null:stream
    lecturer = (lecturer==='')?null:lecturer
    if(lecturer!==null && stream === null){
        CourseModel.find({lecturerName : {$regex : lecturer, $options :'i'}},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                console.log(courses)
                res.json({ok:true,courses})
            }
        })
    }
    else if(lecturer===null && stream !== null){
        CourseModel.find({stream:{$regex:stream,$options:'i'}},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                console.log(courses)
                res.json({ok:true,courses})
            }
        })
        
    }
    else if(lecturer!==null && stream!==null){
        CourseModel.find({lecturerName :{$regex : lecturer, $options :'i'},stream :{$regex:stream,$options:'i'}},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                console.log(courses)
                res.json({ok:true,courses})
            }
        })
    }
    else{
        CourseModel.find({},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                console.log(courses)
                res.json({ok:true,courses})
            }
        })
    }
})

router.post('/search/search',(req,res)=>{
    let search = req.body.search
    console.log(search)
    if(search===undefined||search===null||search===''){
        CourseModel.find({},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                res.json({ok:true,courses})
            }
        })
    }
    else{
        CourseModel.find({title:{$regex:search,$options:'i'}},(err,courses)=>{
            if(err){
                res.json({ok:false,reason:'Something went wrong'})
            }
            else{
                res.json({ok:true,courses})
            }
        })
    }
})
module.exports = router