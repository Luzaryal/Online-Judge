import express from 'express';
import { deleteUser, signout, test, updateUser, solveProblem } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.put('/solveProblem/:userId', solveProblem);
router.post('/signout/', signout);

export default router;