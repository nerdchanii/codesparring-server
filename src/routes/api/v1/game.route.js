import express from 'express';
import Controller from '../../../controllers/api/v1/index.controller';

const router = express.Router();

router.post('/rooms', Controller.gameController.createRoom);
router.get('/rooms', Controller.gameController.getRooms);
router.post('/rooms/:id', Controller.gameController.joinRoom);
// patch? put ?
router.delete('/rooms/:id', Controller.gameController.leaveRoom);

export default router;
