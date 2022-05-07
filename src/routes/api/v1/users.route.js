import express from 'express';
import Controller from '../../../controllers/api/v1/index.controller';

const router = express.Router();

router.get('/', Controller.userController.getUsers);

router.post('/', Controller.userController.createUser);

router.get('/:id', Controller.userController.getUser);

router.delete('/', Controller.userController.removeUser);
router.get('/email/:email', Controller.userController.isExistEmail);
router.get('/nickname/:nickname', Controller.userController.isExistNickname);

export default router;