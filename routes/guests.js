const express = require('express');
const router = express.Router();
const guestController = require('../App/Controllers/guests');
const verifyTioken = require('../verifyToken');
const verifyWithCredentials = require('../verifyWithCredentials')

router.get('/', verifyWithCredentials, guestController.getAll);
router.post('/', guestController.create);
router.put('/:id', verifyTioken, guestController.updateById);
router.delete('/:id', verifyTioken, guestController.deleteById);

module.exports = router;