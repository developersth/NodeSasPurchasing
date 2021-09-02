const express = require('express');
const router = express.Router();
const deliverytermsController = require('../controllers/deliveryterms');

router.get('/', deliverytermsController.index)
router.post('/', deliverytermsController.store)
router.put('/:id', deliverytermsController.update)
router.delete('/:id', deliverytermsController.destroy)

module.exports = router;