const mongoose = require('mongoose')
var {ObjectId} = mongoose.Schema.Types
const User = require('./User')


const PostSchema = mongoose.Schema({
    username:{
        type:String,
    },
    caption:{
        type:String,
    },
    image:{
        type:String,
    },
    postedBy:{
        type:ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Post',PostSchema)