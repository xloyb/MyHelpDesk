// // src/app/api/comments/route.ts
// import prisma from '@/lib/client';
// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const ticketId = url.searchParams.get('ticketId');

//   if (!ticketId) {
//     return NextResponse.json({ error: 'ticketId is required' }, { status: 400 });
//   }

//   const comments = await prisma.comment.findMany({
//     where: { ticketId: parseInt(ticketId, 10) },
//     include: { user: true },
//   });

//   return NextResponse.json(comments);
// }


// export async function POST(request: Request) {
//   try {
//     const { content, ticketId, userId } = await request.json();

//     const ticketIdInt = parseInt(ticketId, 10);
//     if (isNaN(ticketIdInt)) {
//       return NextResponse.json({ error: 'Invalid ticketId' }, { status: 400 });
//     }

//     const newComment = await prisma.comment.create({
//       data: {
//         content,
//         ticketId: ticketIdInt,
//         userId,
//       },
//       include: { user: true },
//     });

//     return NextResponse.json(newComment);
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
//   }
// }



// src/app/api/comments/route.ts
import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ticketId = url.searchParams.get('ticketId');

  if (!ticketId) {
    return NextResponse.json({ error: 'ticketId is required' }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { ticketId: parseInt(ticketId, 10) },
    include: { user: true },
  });

  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  try {
    const { content, ticketId, userId } = await request.json();

    const ticketIdInt = parseInt(ticketId, 10);
    if (isNaN(ticketIdInt)) {
      return NextResponse.json({ error: 'Invalid ticketId' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId: ticketIdInt,
        userId,
      },
      include: { user: true },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
