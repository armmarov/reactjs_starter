'use strict';

const express = require('express');
const router = express.Router();

var controller = require('../controller/users.controller');
var validation = require('../validation/verifyToken');

router.post('/register', controller.registration);
router.post('/login', controller.login);
router.get('/getallusers', validation.verifyToken, controller.getAllUsers);
router.get('/getuserbyid/:id', validation.verifyToken, controller.getUserByID);
router.get('/getuserbyid/:id', validation.verifyToken, controller.getUserByID);
router.put('/updateuserbyid/:id', validation.verifyToken, controller.updateUserByID);
router.delete('/deleteuserbyid/:id', validation.verifyToken, controller.deleteUserByID);

module.exports = router;