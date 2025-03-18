import express from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', authenticateUser, createTask);
router.get('/', authenticateUser, getTasks);

export default router;
