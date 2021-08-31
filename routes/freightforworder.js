const express = require('express');
const router = express.Router();
const freightforworderController = require('../controllers/freightforworder');

router.get('/', freightforworderController.index)
router.post('/', freightforworderController.store)
router.put('/:id', freightforworderController.update)
router.delete('/:id', freightforworderController.destroy)

module.exports = router;