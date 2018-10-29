
const mongoose = require('../db/index')

var i = 0;
const GameLogSchema = mongoose.Schema(
    {
       
        player : {type:String },
        landID : {type:String},
        amount : {type:String},
        integral_num : {type:Number},
        logtime: {type:Date,default: Date.now},
        recast : {type:Number}
    }
)

const GameLog = module.exports = mongoose.model('GameLog',GameLogSchema)
