const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {

    registerUser: (req, res) => {
        var user = new User(req.body);
        user.save(user, (err, newUser) => {
            if (err) {
                console.log('err', err)
                res.status(500).json({ success: false, error: err })
            } else {
                if (newUser) {
                    res.status(200).json({ success: true, user: newUser })
                }
            }
        })
    },

    loginUser: (req, res) => {
        var user= req.body;
        User.findOne({email:user.email},(err,foundUser)=>{
            if(err)
            {
                console.log('err',err);
                res.status(500).json({success:false, error:err});
            }
            else{
                if(foundUser)
                {
                    let isPassWordValid = foundUser.comparePassword(foundUser.password, req.body.password);
                    console.log('isPassWordValid', isPassWordValid);
                    if(isPassWordValid)
                    {
                        // res.status(200).json({sucess:true, message:'login success'});
                        const token = jwt.sign({ userId:foundUser._id},config.secret,{expiresIn: '24h'});
                        res.status(200).json({sucess:true, message:'login success',token:token});
                    }
                    else
                    {
                        res.status(500).json({sucess:false, message:'Invalid password'});
                    }
                }
                else
                {
                    res.status(404).json({sucess:false, message:'User not found'});
                }

            }
        }
        
        );
      

    },

    getUsers:(req,res)=>{
        User.find({},(err,users)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({success:false, error:err})
            }
            else
            {
                console.log(req.decoded);
                res.status(200).json({sucess:true , users:users, verfiedtoken:req.decoded })
            }
        })

    },

    userMail:(req,res)=>{
        User.findOne({email:'mkl@gmail.com'},(err,users)=>
        {
            if(err)
            {
                console.log(err);
                res.status(500).json({success:false,error:err});
            }
            else
            {
                res.status(200).json({success:true , users:users});
            }
            
        })

    },



}