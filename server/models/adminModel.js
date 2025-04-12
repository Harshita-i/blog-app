const mongoose = require('mongoose')

const adminSchema=new mongoose.Schema({
    // firstName: String,
    // lastName:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin