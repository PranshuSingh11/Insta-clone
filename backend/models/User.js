const mongoose = require('mongoose')
var {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    followers:[{
        type:ObjectId,
        ref:'User'
    }],
    following:[{
        type:ObjectId,
        ref:'User'
    }],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('User',userSchema)