import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { validateRequest } from '../middleware/validateRequest';
import { AuthRequest } from '../types';

const router = Router();

const createChatSchema = z.object({
  title: z.string().optional(),
});

const createMessageSchema = z.object({
  content: z.string(),
  role: z.enum(['user', 'assistant']),
  metadata: z.record(z.any()).optional(),
});

router.post('/', validateRequest(createChatSchema), async (req: AuthRequest, res, next) => {
  try {
    const chat = await prisma.chat.create({
      data: {
        title: req.body.title,
        userId: req.user.id,
      },
    });
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const chats = await prisma.chat.findMany({
      where: { userId: req.user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

router.post('/:chatId/messages', validateRequest(createMessageSchema), async (req: AuthRequest, res, next) => {
  try {
    const { chatId } = req.params;
    const chat = await prisma.chat.findUnique({
      where: { id: chatId },
    });

    if (!chat || chat.userId !== req.user.id) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = await prisma.message.create({
      data: {
        ...req.body,
        chatId,
      },
    });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

export { router as chatRouter };