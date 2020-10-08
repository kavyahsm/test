const express = require('express');
const router = express.Router()
const { admin, register, getLogin, getAdmin, deleteAdmin, updateAdmin} = require('../controller/admin');


// router.post('/user/login', getLogin)
 router.get('/admin',  getAdmin)
router.post('/admin', register)
// router.get('/users', getUsers)
router.put('/admin/:id', updateAdmin)
router.delete('/admin/:id', deleteAdmin)


module.exports = router; 
