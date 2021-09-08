const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const passport = require('../config/passport');

router.get('/', passport.authenticate('jwt', { session: false }), userController.index)
router.get('/getNameUsers', userController.findNameUsers)
router.get('/me',passport.authenticate('jwt', { session: false }), userController.me)
router.get('/:id',passport.authenticate('jwt', { session: false }), userController.findById)
router.post('/', userController.store)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.put('/:id', userController.update)
router.delete('/:id', userController.destroy)

module.exports = router;