const mongoose = require('mongoose');

var blog = mongoose.Schema({
title:{type:String, required:true},
description:{type:String, required:true},
createdBy:{type:String, required:true },
createdOn:{type:Number, default:new Date().getTime()  },
likes:{type:Number, default:0},
likedBy:{type:Array},
dislikes:{type:Number, default:0},
dislikedBy:{type:Array, },
comments:[
    {
        comment:{type:String},
        commentBy:{type:String},
    }
]
})

module.exports = mongoose.model('Blog',blog);