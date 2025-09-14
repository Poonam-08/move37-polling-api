import { PrismaClient } from '@prisma/client';
import { io } from '../server.js';

const prisma = new PrismaClient();

export async function vote(req, res) {
  const { userId, pollOptionId } = req.body;

  try {
    const vote = await prisma.vote.create({
      data: { userId, pollOptionId }
    });

    const pollOption = await prisma.pollOption.findUnique({
      where: { id: pollOptionId }
    });

    const pollId = pollOption.pollId;

    const options = await prisma.pollOption.findMany({
      where: { pollId },
      include: { _count: { select: { votes: true } } }
    });

    io.to(`poll-${pollId}`).emit('pollUpdate', {
      pollId,
      results: options.map(o => ({
        id: o.id,
        text: o.text,
        votes: o._count.votes
      }))
    });

    res.status(200).json(vote);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
