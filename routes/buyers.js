const express = require('express');
const router = express.Router();
const buyersController = require('../controllers/buyers');

router.get('/', buyersController.index)
router.post('/', buyersController.store)
router.put('/:id', buyersController.update)
router.delete('/:id', buyersController.destroy)

module.exports = router;