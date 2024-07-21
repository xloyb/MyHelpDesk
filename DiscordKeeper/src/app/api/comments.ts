// src/pages/api/comments.ts
import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ticketId = url.searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId is required' }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { ticketId: parseInt(ticketId, 10) },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, ticketId, userId } = await request.json();
    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId: parseInt(ticketId, 10),
        userId,
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
