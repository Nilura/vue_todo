const mongoose=require('mongoose')

const schema=mongoose.Schema({
    task:String
})

module.exports=mongoose.model('taskr',schema)