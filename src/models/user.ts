let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username:{type:String, required:true, index:{unique:true}},
    password:{type:String, required:true, select:false}
})

module.exports = mongoose.model('Users', userSchema)