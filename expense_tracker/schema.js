const { default: mongoose } = require('mongoose')
const mmongoose = require('mongoose')

const expenseTrackerSystem = new mongoose.Schema({
amount:{
    type:Number,
},
category:{
    type:String,

},
date:{
    type:String,
}
})

const Expense = mongoose.model('expensetracker',expenseTrackerSystem)
module.exports={Expense};