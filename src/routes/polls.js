import express from 'express';
import { createPoll, getPoll } from '../controllers/pollController.js';

const router = express.Router();

router.post('/', createPoll);
router.get('/:id', getPoll);

export default router;
