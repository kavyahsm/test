const mongoose = require('mongoose');
const Schema = mongoose.Schema



const couponSchema = mongoose.Schema({

    coupon_id:{

        type:String,
        trim:true,
    },
 
    expiry_date:{

        type:Number,
        trim:true,
        default:8760
    },


    isactive:{

        type:Boolean,
        default:false
    },

    issued:{

        type:Boolean,
        default:false
    },

    cvv:{

        type:String,
        default:"3481"
    },
    amount:{

        type:Number,
        default:0
    },
    user:[{
        type:Schema.Types.ObjectId,
        ref:"ExistUser",
    }]



}, {timestamps:true})


module.exports = mongoose.model('Coupons', couponSchema)