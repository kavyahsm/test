const mongoose = require('mongoose');

const Schema = mongoose.Schema

const existuserSchema = mongoose.Schema({

    user_name:{

        type:String,
        trim:true,
        required:[true, 'is required'],
    },
    email:{
   
        type:String,
        trim:true,
        required:[true, 'is required']
    },
    password:{
          type:String,
          trim:true,
    },

   balance:{
            type:Number,
            default:0
     
   },

   coupons:[{
            type:Schema.Types.ObjectId,
            ref:"Coupons",

   }]
         
   
}, {timestamps:true})


module.exports = mongoose.model('ExistUser', existuserSchema)