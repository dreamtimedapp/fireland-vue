
const mongoose = require('../db/index')

var i = 0;
const CounterSchema = mongoose.Schema(
    {
        player : {type:String },
        logtime: {type:Date,default: Date.now},
    }
)

const Counter = module.exports = mongoose.model('Counter',CounterSchema)
