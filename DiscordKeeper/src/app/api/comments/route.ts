import { NextResponse } from 'next/server';
import prisma from '@/lib/client';

// Handler for GET requests
export async function GET(request: Request) {
  const url = new URL(request.url);
  const ticketId = url.searchParams.get('ticketId');

  try {
    const comments = await prisma.comment.findMany({
      where: ticketId ? { ticketId: parseInt(ticketId) } : undefined,
      orderBy: { createdAt: 'asc' },
      include: { user: true },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// Handler for POST requests
export async function POST(request: Request) {
  try {
    const { content, ticketId, userId } = await request.json();

    if (!content || !ticketId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId,
        userId,
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
