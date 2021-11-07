const express = require('express');
const router = express.Router();
const paymenttermController = require('../controllers/PaymentTermController');

router.get('/', paymenttermController.index)
router.post('/', paymenttermController.store)
router.put('/:id', paymenttermController.update)
router.delete('/:id', paymenttermController.destroy)

module.exports = router;