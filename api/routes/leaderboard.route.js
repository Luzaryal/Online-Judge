import express from 'express';
import { getUserScores } from '../controllers/leaderboard.controller.js';

const router = express.Router();

router.get('/getleaderboard', getUserScores);

export default router;
