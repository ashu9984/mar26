//These routes will be used for registration and Login , here
// we would register the user and authenticate the user and generate the token
// the token will be supplied to the user
var express = require('express');
var registrationLogin = express.Router();
var mongoose = require('mongoose');

var mongojs = require('mongojs');
var user = require('../models/user')
var jwt = require('jsonwebtoken');
var superSecret = require('../config')
var router = require('router');
var nodemailer = require('nodemailer');
var otp= Math.floor(Math.random() *1000000).toString()

registrationLogin.post('/registration', function (req, res) {
    if (!req.body.email || !req.body.password || !req.body.fname || !req.body.fname || !req.body.lname || !req.body.cpass) {
        res.json({
            success: false,
            msg: " no data entered"
        })
    } else {
         userSave = new user({
            fname: req.body.fname,
            lname: req.body.lname,
            mno: req.body.mno,
            email: req.body.email,
            password: req.body.password,
            otp:otp
            
            
            
          })

        }
        user.findOne({ email: req.body.email }, (err, lData) => {
            if (err) {
                res.json({
                    success: false,
                    
                })

            }
            else if (lData != null || lData) {
                res.json({
                    success: false,
                    msg: "Email already registered "
                })
            } else {
                userSave.save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: true,
                            msg: "RESGISTRATION DONE "                     })
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user : "ashuch9984@gmail.com",
                              pass :"ashu@@9984"
                            }
                          });
                          
                          var mailOptions = {
                            from: 'ashuch9984@gmail.com',
                            to: req.body.email,
                            subject: 'Send Email using Node.js',
                            text: "your Otp is  "+ otp
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                        
                                  
                    } else {res.json({
                        success: true,
                        msg:"Mobile No already registered "
                        ,

                    })
                }

                       



                })
            }
        })


    }
)




registrationLogin.post('/login', function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: "No data entered"
        })
    } else {
        user.findOne({
            email: req.body.email
        }, function (err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, msg: ' User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.json({ success: false, msg: ' Wrong password.' });

                }
                else if(user.otp != req.body.otp){
                    res.json({ success: false, msg: ' Wrong OTP.' });

                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, superSecret.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        msg: "login Done",
                        token: token
                    });
                }

            }

        })
    }
})


registrationLogin.get('/getAll', function (req, res) {



    user.find(function (err, data) {
        if(data){
            console.log(data);
            res.json({
               success: true,
                users :data
            });
       }
        else{
            res.json({
                success: false,
                
                users :data
            });
            
        }
        




    })
    console.log("get api call");
});

registrationLogin.delete('/delete/:id', function (req, res) {

    var id = req.params.id;
    console.log(id);
    user.remove({ _id: mongojs.ObjectId(id) }, function (err, args) {
        res.json(args);
       

    })
    console.log("delete api call");
})



registrationLogin.get('/get/:id', function (req, res) {
    var id = req.params.id;

    user.findOne({ _id: mongojs.ObjectId(id) }, function (err, args) {
        res.json(args);

    })
    console.log("edit get api call");
    



});

registrationLogin.get('/geta', function (req, res) {

      
       
    user.find(function(err,args)
    {
        console.log(args);
         res.json(args);


    })

    });

module.exports = registrationLogin;
