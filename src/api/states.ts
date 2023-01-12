import express from 'express';


const router = express.Router();

router.get('/', (req, res) => {
  res.json({states: 111});
});

router.get('/congressional', (req, res) => {
  res.json({districts:111});
});

export default router;
