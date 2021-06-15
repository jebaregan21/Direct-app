const path = require('path')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const SessionModel = require('../models/SessionModel')
const jwt = require('jsonwebtoken')
const jwtPassword = require('../Additional/Password')

router.get('/check/:id',(req,res)=>{
    const id = req.params.id
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        SessionModel.findById(id,(err,session)=>{
            if(err){
                res.json({ok:false})
            }
            let split = req.headers.authorization.split(' ')
            const token = split[1]
            jwt.verify(token,jwtPassword,(err,decoded)=>{
                if(err){
                    res.json({ok:false})
                }
                else{
                    res.json({ok:true,firstName : decoded.firstName, userId : decoded.userId,session})
                }
            })
        })
    }
    else{
        res.json({ok:false})
    }
})

router.get('/video/:id',(req,res)=>{
    const id = req.params.id
    const dir = path.join(__dirname+"/../videos/"+id+".mp4")
    const stat = fs.statSync(dir)
    const fileSize = stat.size
    const range = req.headers.range

    if(range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0],10)
        const end = (parts[1]) ? parseInt(parts[1],10) : fileSize-1
        
        if(start>=fileSize){
            res.status(416).send('Requested range not available')
            return
        }
        
        const chunkSize = (end-start)+1
        const file = fs.createReadStream(dir, {start,end})
        const head = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges' : 'bytes',
            'Content-Length' : chunkSize,
            'Content-Type' : 'video/mp4',
        }
        res.writeHead(206,head)
        file.pipe(res)
    }
    else{
        
        const head = {
            'Content-Length' : fileSize,
            'Content-Type' : 'video/mp4',
        }
        res.writeHead(200,head)
        fs.createReadStream(dir).pipe(res)
    }
})

module.exports = router