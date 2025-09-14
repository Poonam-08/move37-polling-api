import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPoll(req, res) {
  const { question, options, creatorId } = req.body;

  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        isPublished: true,
        creatorId,
        options: {
          create: options.map(text => ({ text }))
        }
      },
      include: { options: true }
    });

    res.status(201).json(poll);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function getPoll(req, res) {
  const { id } = req.params;

  try {
    const poll = await prisma.poll.findUnique({
      where: { id: Number(id) },
      include: {
        options: {
          include: {
            _count: { select: { votes: true } }
          }
        }
      }
    });

    res.json(poll);
  } catch (e) {
    res.status(404).json({ error: 'Poll not found' });
  }
}
