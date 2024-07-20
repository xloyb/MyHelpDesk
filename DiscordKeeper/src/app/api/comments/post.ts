import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/client';
import { Server } from 'socket.io';
import { createServer } from 'http';

// Create an HTTP server for Socket.IO
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log('API: Socket.IO connected');

  socket.on('chat message', (msg) => {
    console.log('API: Message received:', msg);
    io.emit('chat message', msg);
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { content, ticketId, userId } = req.body;

      if (!content || !ticketId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newComment = await prisma.comment.create({
        data: {
          content,
          ticketId,
          userId,
        },
      });

      // Broadcast the new comment to all WebSocket clients
      io.emit('chat message', newComment);

      res.status(201).json(newComment);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to post comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
