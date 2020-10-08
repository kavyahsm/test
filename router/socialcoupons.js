const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const { addsocialcoupons, deletesocialcoupons, updatesocialcoupons, getsocialcoupons } = require('../controller/social_coupons');


// router.post('/user/login', getLogin)
router.post('/socialcoupons', addsocialcoupons)
router.get('/socialcoupons', getsocialcoupons)
router.put('/socialcoupon/:id', updatesocialcoupons)
router.delete('/socialcoupon/:id', deletesocialcoupons)

module.exports = router;