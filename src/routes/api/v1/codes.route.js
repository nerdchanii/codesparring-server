import express from 'express';
import Controller from '../../../controllers/api/v1/index.controller';
const router = express.Router();

router.post('/test', Controller.codeController.codeTest);
router.post('/submit', Controller.codeController.codeSubmit);

export default router;
