const express = require('express')
const router = express.Router();
const multer = require('multer')
var ffmpeg = require("fluent-ffmpeg");
const {Video}= require('../models/Video');


let storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext !== '.mp4'){
            return cb(res.status(400).end('only mp4 is alowed'), false)
        }
        cb(null, true)
    }
})

const uplaod = multer({storage:storage}).single('file')

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장한다.
    uplaod(req, res, err=>{
        if(err){
            return res.json({success:false, err})
        }
        return res.json({success:true, url: res.req.file.path, filename:res.req.file.filename})
    })
})

router.post('/uploadVideo', (req,res)=>{
    //비디오 정보들을 저장한다.
    const video = new Video(req.body)
    video.save((err, doc)=> {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
})

router.post('/getVideos', (req,res)=>{
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
        .populate('writer')
        .exec((err, videos)=> {
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, videos})
        })
})

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성하고 비디오 러닝타임도 가져오기
    let filePath = ""
    let fileDuration = ""

    // 비디오 정보 가져오기
    console.log(req.body)
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.log(metadata)
        fileDuration = metadata.format.duration
    })

    // 썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames){
        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function(){
        return res.json({success: true, url:filePath, fileDuration:fileDuration})
    })
    .on('error', function(err){
        return res.json({success:false, err})
    })
    .screenshots({
        //will take screenshots 
        count : 3,
        folder:'uploads/thumbnails',
        size: '320x240',
        filename : 'thumbnail-%b.png'
    })

})


module.exports = router