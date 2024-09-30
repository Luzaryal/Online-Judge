import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getProblems } from '../controllers/problem.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getproblems', getProblems);

export default router;