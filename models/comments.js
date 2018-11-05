
const mongoose = require('../db/index')

var i = 0;
const CommentsSchema = mongoose.Schema(
    {
        id:{type:Number},
        name:{type:String},
        avatar:{type:String},
        content:{type:String},
        postId:{type:Number},
        userId:{type:Number},
        timestamp: {type:Date,default: Date.now},
    }
)

const Comments = module.exports = mongoose.model('Comments',CommentsSchema)
