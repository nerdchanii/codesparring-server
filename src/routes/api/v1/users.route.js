import express from 'express';
import authHandler from '../../../controllers/api/v1/handler/auth.handler';
import Controller from '../../../controllers/api/v1/index.controller';

const router = express.Router();
// url/api/v1/users

router.get('/', Controller.userController.getUsers);
router.get('/ranks', Controller.userController.getRanks);

router.post('/', Controller.userController.createUser);

router.get('/:nickname', Controller.userController.getUser);

router.delete('/', Controller.userController.removeUser);
router.get('/isduplicate/email/:email', Controller.userController.isExistEmail);
router.get('/isduplicate/nickname/:nickname', Controller.userController.isExistNickname);

export default router;
