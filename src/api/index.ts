import express from 'express';
import states from './states';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Testing',
  });
});

router.use('/states', states);

export default router;
