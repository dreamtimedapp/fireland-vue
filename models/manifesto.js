
const mongoose = require('../db/index')

var i = 0;
const ManifestoSchema = mongoose.Schema(
    {
       
        player : {type:String },
        manifesto : {type:String},
        logtime: {type:Date,default: Date.now},
    }
)

const GameLog = module.exports = mongoose.model('ManiFesto',ManifestoSchema)
