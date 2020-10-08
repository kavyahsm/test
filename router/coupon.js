const express = require('express');
const router = express.Router()
const { genrateCoupon, addCopouns, issuedHandler, assignCouponbyexel, assignCouponbymanuel } = require('../controller/coupon');



router.post('/coupon', genrateCoupon);
// router.post('/addcoupons', addCopouns);
router.post('/issued_coupons', issuedHandler);
router.post('/assign_coupons_excel', assignCouponbyexel);
router.post('/assign_coupons_manuel', assignCouponbymanuel);

// router.get('/coupon/:id', getCoupon);
// router.put('/coupon/:id', updateCoupon);
// router.delete('/coupon/:id', deleteCupon);

module.exports = router; 