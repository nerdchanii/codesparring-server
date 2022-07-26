import express from 'express';
import v1 from './v1';
import errorHandller from '../../controllers/api/v1/handler/error.handler';

const router = express.Router();

router.use('/v1', v1);
router.use(errorHandller);

export default router;