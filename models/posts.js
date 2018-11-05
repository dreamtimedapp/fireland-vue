
const mongoose = require('../db/index')

var i = 0;
const PostsSchema = mongoose.Schema(
    {
        id:{type:Number},
        name:{type:String},
        avatar:{type:String},
        content:{type:String},
        title:{type:String},
        userId:{type:Number},
        timestamp: {type:Date,default: Date.now},
    }
)

const Posts = module.exports = mongoose.model('Posts',PostsSchema)
