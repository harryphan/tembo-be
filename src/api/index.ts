import express from 'express';
import users from './users';
import messages from './messages';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Testing',
  });
});

router.use('/users', users);
router.use('/messages', messages);

export default router;
