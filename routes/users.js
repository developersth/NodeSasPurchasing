const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.index)
router.get('/getNameUsers', userController.findNameUsers)
router.post('/', userController.store)
router.post('/login', userController.login)
router.put('/:id', userController.update)
router.delete('/:id', userController.destroy)

module.exports = router;