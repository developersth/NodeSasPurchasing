const express = require('express');
const router = express.Router();
const userrolesController = require('../controllers/UserRoleConntroller');

router.get('/', userrolesController.index)
router.post('/', userrolesController.store)
router.put('/:id', userrolesController.update)
router.delete('/:id', userrolesController.destroy)

module.exports = router;