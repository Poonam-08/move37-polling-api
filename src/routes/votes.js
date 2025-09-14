import express from 'express';
import { vote } from '../controllers/voteController.js';

const router = express.Router();

router.post('/', vote);

export default router;
