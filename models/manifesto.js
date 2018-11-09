
const mongoose = require('../db/index')

var i = 0;
const ManifestoSchema = mongoose.Schema(
    {
       
        player : {type:String },
        manifesto : {type:String}
    }
)

const GameLog = module.exports = mongoose.model('ManiFesto',ManifestoSchema)
