const mongoose = require('mongoose')
const Schema = mongoose.Schema


const socialSchema = mongoose.Schema({
    category: {
        type: String,
        trim: true,
        required: [true, 'is required'],
    },


    value: {
        type: Number,
        trim: true,
        required: [true, 'is required'],
    },

    cashback: {

        type: Number,
        trim: true,
        require: [true, 'is required'],
    },

    effective_price: {

        type: Number,
        trime: true,
        require: [true, 'is required'],
    },

    validity: {

        type: String,
        trime: true,
        require: [true, 'is required'],


    },

    details: {
        type: String,
        trim: true,
        require: [true, 'is required'],
    },

})

module.exports = mongoose.model('SocialCoupons', socialSchema)