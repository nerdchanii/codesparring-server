import express from 'express';
import Controller from '../../../controllers/api/v1/index.controller';

const router = express.Router();


router.get('/', Controller.noticeController.getNotices);
router.post('/', Controller.noticeController.createNotice);
router.get('/id', Controller.noticeController.getNotice);
router.put('/:id', Controller.noticeController.updateNotice);
router.delete('/:id', Controller.noticeController.removeNotice);

export default router;
