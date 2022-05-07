import expres from 'express';
const router = expres.Router();

/**
 * GET / home page
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
}
);

export default router;