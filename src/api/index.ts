import express from 'express';
import users from './users';
import messages from './messages';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Testing',
  });
});

/**
 * message and user should be separate microservices. User should be responsible for authentication and getting JWT
 * into cookies and other user related responsibilities. same with messages.
 *
 */
router.use('/users', users);
router.use('/messages', messages);

export default router;
