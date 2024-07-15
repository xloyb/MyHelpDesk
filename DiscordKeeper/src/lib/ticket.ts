"use server"

import prisma from "./client";

// Get all tickets
export const getAllTickets = async () => {
  return prisma.ticket.findMany({
    include: {
      users: true,
      comments: true,
    },
  });
};

// Update ticket status
export const updateTicketStatus = async (ticketId: number, status: string) => {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status },
  });
};


export const getTicketIdByToken = async (token: string): Promise<number | null> => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        token: token,
      },
      select: {
        id: true,
      },
    });

    return ticket ? ticket.id : null;
  } catch (error) {
    console.error('Error fetching ticket by token:', error);
    throw new Error('Failed to fetch ticket by token');
  }
};


export const updateTicketStatusByToken = async (token: string, newStatus: string) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { token },
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    await prisma.ticket.update({
      where: { token },
      data: { status: newStatus },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw new Error('Failed to update ticket status');
  }
};
