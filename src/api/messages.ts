import express from 'express';
import {Message} from '../models';


const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await Message.findAll();
  res.json({messages});
});



export default router;
