var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var multer = require('multer')

var upload = multer({
    dest: 'ashu/'
})

app.post('/abc', upload.any(), (req,res)=>{
    if(req.files){
        res.json({
            success: true,
            
        })
    }else{
        res.json({
            success: false
        })
    }
})

app.listen(3000,()=>{
    console.log('3000')
})