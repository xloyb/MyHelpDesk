"use server"

import { sendTicketSetupNotification } from "../../utils/ticketSetup";
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



export const getTicketByToken = async (token: string) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        token: token,
      },
      include: {
        users: true, 
        comments: true, 
      },
    });

    return ticket;
  } catch (error) {
    console.error('Error fetching ticket by token:', error);
    throw new Error('Failed to fetch ticket by token');
  }
};


export const isClosed = async (token: string): Promise<boolean> => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { token },
      select: { status: true },
    });

    if (!ticket || ticket.status === null) {
      throw new Error('Ticket not found or status is null');
    }

    return ticket.status.toLowerCase() === 'closed';
  } catch (error) {
    console.error('Error checking if ticket is closed:', error);
    throw error;
  }
};


export const setupTicketsChannel = async () => {
  try {
    const notificationParams = {
      title: 'Welcome to the Tickets Channel!',
      description: 'To open a ticket, click the button below:',
    };

    await sendTicketSetupNotification(notificationParams);

    console.log('Tickets channel setup notification sent successfully!');
  } catch (error) {
    console.error('Failed to send tickets channel setup notification:', error);
  }
};



export const getAllTicketsNotes = async () => {
  return prisma.ticket.findMany({
    include: {
      comments: true,          
      users: {                 
        include: {
          user: true
        }
      },
      StaffTicketNote: true   
    },
  });
};


export const addStaffTicketNote = async (data: {
  content: string;
  staffId: string;
  ticketId: number;
}) => {
  const { content, staffId, ticketId } = data;
  
  return prisma.staffTicketNote.create({
    data: {
      content,
      staffId,
      ticketId,
    },
  });
};



export const updateStaffTicketNote = async (id: number, data: {
  content?: string;
  staffId?: string;
  ticketId?: number;
}) => {
  const { content, staffId, ticketId } = data;
  
  return prisma.staffTicketNote.update({
    where: { id },
    data: {
      content,
      staffId,
      ticketId,
    },
  });
};

export const deleteStaffTicketNote = async (noteId: number): Promise<void> => {
  try {
    await prisma.staffTicketNote.delete({
      where: { id: noteId },
    });
  } catch (error) {
    console.error('Error deleting staff ticket note:', error);
    throw new Error('Failed to delete note');
  }
};
