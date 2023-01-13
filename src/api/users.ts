import express from 'express';
import {User} from '../models';


const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json({users});
});



export default router;
