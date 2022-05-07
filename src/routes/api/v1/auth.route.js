import express from 'express';
import Controller from '../../../controllers/api/v1/index.controller'
const router = express.Router();

router.post('/token', Controller.authController.createToken);

export default router;