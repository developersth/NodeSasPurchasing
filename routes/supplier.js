const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierConntroller');

router.get('/', supplierController.index)
router.post('/', supplierController.store)
router.put('/:id', supplierController.update)
router.delete('/:id', supplierController.destroy)

module.exports = router;