const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments');

router.get('/', paymentsController.index)
router.get('/:id', paymentsController.findById)
router.post('/', paymentsController.store)
router.put('/:id', paymentsController.update)
router.delete('/:id', paymentsController.destroy)

module.exports = router;