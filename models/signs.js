
const mongoose = require('../db/index')

var i = 0;
const SignSchema = mongoose.Schema(
    {
       
        account :{ type:String },
        integral_num : {type:Number},
        created_at: {type:Date,default: Date.now}
    }
)

const Sign = module.exports = mongoose.model('Signs',SignSchema)
