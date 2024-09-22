"use server"
import { Ticket } from "@prisma/client";
import prisma from "./client";




export const fetchCommentsByTicketToken = async (token: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: { token },
    include: {
      comments: {
        include: {
          user: true, 
        },
      },
    },
  });

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  return ticket.comments;
};

// export const fetchCommentsByTicketToken = async (token: string) => {
//   try {
//     const ticket = await prisma.ticket.findUnique({
//       where: { token },
//       include: { comments: true },
//     });

//     if (!ticket) {
//       throw new Error('Ticket not found');
//     }

//     return ticket.comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw new Error('Failed to fetch comments');
//   }
// };


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


// export const fetchUserTickets = async (userId: string): Promise<Ticket[]> => {
//   console.log("userid in data.ts",userId)
//   try {
//     const tickets: Ticket[] = await prisma.ticket.findMany({
//       where: {
//         users: {
//           some: {
//             userId: userId,
//           },
//         },
//       },
//       select: {
//         id: true,
//         title: true,
//         token: true,
//         content: true, 
//         status: true,
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     return tickets;
//   } catch (error) {
//     console.error('Error fetching user tickets:', error);
//     throw new Error('Failed to fetch user tickets');
//   }
// };

export const fetchUserTickets = async (userId: string): Promise<Ticket[]> => {
  console.log("userid in data.ts", userId);
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
        payment: true,            
        desiredExchange: true,     
        walletAddress: true,       
        amount: true,              
        cardId: true,              
        paypalEmail: true,         
        payoneerEmail: true,       
        skrillEmail: true,         
        type: true,                
        users: true,               
        comments: true,            
        StaffTicketNote: true,     
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    return tickets;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw new Error('Failed to fetch user tickets');
  }
};

