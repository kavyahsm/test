const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = mongoose.Schema({

    user_name:{

        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    password:{
          type:String,
          trim:true,
         required:[true, 'is required'],

    },

   phone_number:{
            type:String,
            trim:true,
   },
   coupons:[{
            type:Schema.Types.ObjectId,
            ref:"Coupons",

   }]
         
   
    


}, {timestamps:true})


module.exports = mongoose.model('User', userSchema)