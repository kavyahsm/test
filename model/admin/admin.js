const mongoose = require('mongoose');

const Schema = mongoose.Schema

const adminSchema = mongoose.Schema({

    admin_name:{

        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    password:{
          type:String,
          trim:true,
         required:[true, 'is required'],

    }
  
   
}, {timestamps:true})


module.exports = mongoose.model('Admin', adminSchema)