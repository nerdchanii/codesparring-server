import express from 'express';
const router = express.Router();
import Controller from '../../../controllers/api/v1/index.controller';


router.post('/test', Controller.codeController.codeTest);
router.post('submit', Controller.codeController.codeSubmit);

export default router;