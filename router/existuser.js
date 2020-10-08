const express = require('express');
const router = express.Router()
// const jwt=require('jsonwebtoken')
const { addCopouns, createPassword } = require('../controller/users/existUser');


router.post('/exist_user/add_coupon', addCopouns)
//  router.get('/users',  getAllUser)
// router.post('/user', register)
// router.post('/user/auth', login)
// // router.get('/users', getUsers)
// router.put('/user/:id', updateUser)
// router.delete('/user/:id', deleteUser)

module.exports = router; 
