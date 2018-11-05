
const mongoose = require('../db/index')

var i = 0;
const UserSchema = mongoose.Schema(
    {
        id: {type:Number},
        avatar:{type,String},
        name:{type,String},
        timestamp: {type:Date,default: Date.now}
    }
)

const UserSchema = module.exports = mongoose.model('User',UserSchema)
