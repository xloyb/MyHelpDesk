"use server"

import { z } from 'zod';
import crypto from 'crypto';
import { auth } from '@clerk/nextjs/server';
import prisma from './client';


export const createTicket = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const TitleSchema = z.string().min(1).max(255);
  const ContentSchema = z.string().min(1).max(1000);

  const validatedTitle = TitleSchema.safeParse(title);
  const validatedContent = ContentSchema.safeParse(content);

  if (!validatedTitle.success) {
    console.log('Title is not valid');
    return;
  }

  if (!validatedContent.success) {
    console.log('Content is not valid');
    return;
  }

  const { userId } = auth();

  if (!userId) throw new Error('User is not authenticated!');

  // Generate a secure token
  const token = crypto.randomBytes(32).toString('hex');

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        title: validatedTitle.data,
        content: validatedContent.data,
        status: 'open', // setting default status as 'open'
        token,
        users: {
          create: {
            userId,
          },
        },
      },
    });

    console.log('Ticket created successfully:', newTicket);
  } catch (err) {
    console.log('Error creating ticket:', err);
  }
};


export const checkTokenExists = async (token: string): Promise<boolean> => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        token,
      },
    });

    return !!ticket;
  } catch (error) {
    console.error('Error checking token existence:', error);
    return false; 
  } finally {
    await prisma.$disconnect(); 
  }
};
