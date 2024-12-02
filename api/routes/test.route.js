
import express from 'express';

import { runAll } from '../controllers/test.controller.js';

const router = express.Router();

router.post('/submit', runAll);

export default router;