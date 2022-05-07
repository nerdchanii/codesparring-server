import express from 'express';
import errorHandller from '../../../controllers/api/v1/handler/error.handler';
const router = express.Router();
import users from './users.route';
import auth from './auth.route.js';
// import game from './game.route';
// import codes from './codes.route';
// import problems from './problems.route';
// import notices from './notices.route';


router.use('/users', users);
router.use('/auth', auth);
// router.use('/game', game);
// router.use('/codes', codes);
// router.use('/problems', problems);
// router.use('/notices', notices);

/**
 * Error handler for API v1
 */

router.use(errorHandller);

export default router;