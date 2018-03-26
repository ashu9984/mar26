var express = require('express')

var app = express.Router()

var mongoose = require('mongoose')
var mongojs = require('mongojs');
var product = require('../models/product')
var router = require('router')


var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var multer = require('multer')

var upload = multer({
    dest: 'ashish/'
})

app.post('/abc', upload.any(), (req,res)=>{
    if(req.files){
        res.json({
            success: true
        })
    }else{
        res.json({
            success: false
        })
    }
})


app.post('/add', function (req, res) {
    
        if (req.body.proname && req.body.protype) {
            var productSave = new product({
               
                proname: req.body.proname,
                protype: req.body.protype,
                proimage:req.body.proimage
            })

    
            productSave.save(function (err, data) {
                if (err) {
                    res.json({
                        success: false
                    })
                }
    
                res.json({
                    success: true,
                    msg: 'Product save '
                })
            })
        } else {          
            res.json({
                sucess: false,
                msg: 'No Data Sent'
            })
        }
    
    })


app.get('/getdata', function (req, res) {



    product.find(function (err, data) {
        if(data){
            console.log(data);
            res.json({
               success: true,
                products :data
               
            });
       }
        else{
            res.json({
                success: false,
                
              
            });
            
        }
        




    })
    console.log("get api call");

});




app.delete('/delete/:id', function (req, res) {
    
        var id = req.params.id;
        console.log(id);
        product.remove({ _id: mongojs.ObjectId(id) }, function (err, args) {
            res.json({
                msg: 'Product Delete',
                

            });

           
    
        })
        console.log("delete api call");
    })
    
    
    
app.get('/edit/:id', function (req, res) {
        var id = req.params.id;
    
        product.findOne({ _id: mongojs.ObjectId(id) }, function (err, args) {
            res.json(args);
    
        })
    
    
        console.log("edit get api call");
    
    
    });
    app.post('/updateProduct/:id',function(req, res){
            console.log('errrr')
            var id =req.params.id;
        
            console.log(req.body.proname);
        
            product.findAndModify( { 
                query: { _id: mongojs.ObjectId(id) } , 
                update: {$set: {proname: req.body.proname , protype: req.body.protype   } },
                new: true } , function(err,args){ 
        
                res.json(args);
                
        
             }); console.log("put api call");
        })
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Headers: X-Requested-With');
            next();
          });


   module.exports = app