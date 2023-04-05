const express = require('express');
const router = express.Router();
const userController = require('../App/Controllers/users');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;