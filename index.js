const express = require('express');
const mongoose = require('mongoose');
const port = parseInt(process.env.PORT, 10) || 5000
const config = require('config')
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const user = require('./router/user')
const admin = require('./router/admin')
const coupon = require('./router/coupon')
const existuser = require('./router/existuser')
const socialcoupons = require('./router/socialcoupons')




const app = express();

app.use(morgan('dev'));

app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true }, { limit: '12mb' }));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.get('cookieyKey')]
}))

mongoose.connect(config.get('DB_URI'), { useNewUrlParser: true, useUnifiedTopology: true }, () => {

    console.log('MongoDb Connected Succefully');
})


app.use('/api', user)
app.use('/api', admin)
app.use('/api', coupon)
app.use('/api', existuser)
app.use('/api', socialcoupons)




app.listen(port, () => {

    console.log(`server started on ${port}`);

})

console.log("something went wrong")