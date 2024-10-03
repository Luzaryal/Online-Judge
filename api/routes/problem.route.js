import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteproblem, getProblems, updateproblem } from '../controllers/problem.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getproblems', getProblems);
router.delete('/deleteproblem/:problemId/:userId', verifyToken, deleteproblem);
router.put('/updateproblem/:problemId/:userId', verifyToken, updateproblem);

export default router;