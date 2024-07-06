"use server"
import { Ticket } from "@prisma/client";
import prisma from "./client";

export const fetchUserTickets = async (userId: string): Promise<Ticket[]> => {
  console.log("userid in data.ts",userId)
  try {
    const tickets: Ticket[] = await prisma.ticket.findMany({
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        token: true,
        content: true, 
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return tickets;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw new Error('Failed to fetch user tickets');
  }
};
