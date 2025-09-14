import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import pollRoutes from './routes/polls.js';
import voteRoutes from './routes/votes.js';
import setupSocket from './socket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/polls', pollRoutes);
app.use('/votes', voteRoutes);

setupSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
