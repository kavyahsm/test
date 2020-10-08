const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const { user, register, login, getAllUser, updateUser, deleteUser, isAuthenticate, getCurrentUser } = require('../controller/users/user');


// router.post('/user/login', getLogin)
router.get('/users', getAllUser)
router.post('/user', register)
router.post('/auth', login)
router.get('/user', isAuthenticate, getCurrentUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router;