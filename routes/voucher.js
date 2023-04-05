const express = require('express');
const router = express.Router();
const voucherController = require('../App/Controllers/voucher');
// const verifyTioken = require('../verifyToken');

router.get('/',voucherController.getAll);
router.post('/', voucherController.create);
router.put('/:id' ,voucherController.updateById);
router.delete('/:id' ,voucherController.deleteById);


router.post('/insertMany', voucherController.insertMany);
router.get('/UnusedVoucher', voucherController.UnusedVoucher)
router.put('/updateVoucherUsed/:id', voucherController.updateVoucherUsed)
router.get('/getAndUpdateVoucher', voucherController.getAndUpdateVoucher);

module.exports = router;