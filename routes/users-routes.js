const express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUser);

router.get('/:id',  userController.getUserByID);

router.post('/signup',  userController.signUp);

router.post('/login',  userController.login);

router.put('/:id',  userController.postUserByID);

router.delete('/:id',  userController.deleteUser);

module.exports = router;