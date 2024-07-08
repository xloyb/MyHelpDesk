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
