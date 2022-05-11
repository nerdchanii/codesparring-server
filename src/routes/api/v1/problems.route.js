import expres from 'express';
import Controller from '../../../controllers/api/v1/index.controller';

const router = expres.Router();

router.get('/', Controller.problemController.getProblems);
router.post('/', Controller.problemController.createProblem);
router.get('/:id', Controller.problemController.getProblem);
router.put('/:id', Controller.problemController.updateProblem);

export default router;
