import expres from 'express';
import Controller from '../../../controllers/api/v1/index.controller';


const router = expres.Router();

router.get('/', Controller.problemController.method)
router.post('/', Controller.problemController.method)
router.get('/:id', Controller.problemController.method)
router.put('/:id', Controller.problemController.method)



export default router;