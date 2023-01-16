const express = require('express');
const jwtAuth = require('../../services/passport');
const upload = require('../../services/multer-service');
const userController = require('../../controllers/user/user.controller'); 
const router = express.Router();

router.post('/',  upload.single('profileImage'), userController.create);

router.post('/login', userController.login);

router.patch('/:userId/email', jwtAuth.authenticate(), userController.updateEmail);

router.patch('/:userId',  upload.single('profileImage'), jwtAuth.authenticate(), userController.updateUser);

module.exports = router;