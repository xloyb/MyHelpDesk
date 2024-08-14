"use server";

import { z } from "zod";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { revalidatePath } from "next/cache";
import { sendTicketNotification } from "../../utils/sendTicketNotification";
import { fetchUserById } from "./user";
import { addBotMessage } from "./message";


interface Settings {
  discordLogs?: boolean;
}


export const fetchSettings = async (): Promise<Settings | null> => {
  try {
    const response = await fetch(`${process.env.DOMAIN}/api/get-settings`);
    if (!response.ok) {
      throw new Error(`Error fetching settings: ${response.statusText}`);
    }
    const data: Settings | null = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching settings:", err);
    return null; 
  }
};

export const addComment = async (
  ticketId: number,
  userId: string,
  content: string
): Promise<void> => {
  console.log("xLoy was here addComment", ticketId, userId, content);
  try {
    await prisma.comment.create({
      data: {
        content: content,
        ticketId: ticketId,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }
};


export const createExchange = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  const user = await fetchUserById(userId);
  if (!user) throw new Error("User not found!");

  // Generate a secure token
  const token = crypto.randomBytes(32).toString("hex");

  // Extract data from FormData
  const payment = formData.get('payment') as string;
  const desiredExchange = formData.get('desiredExchange') as string;
  const walletAddress = formData.get('walletAddress') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const cardId = formData.get('cardId') as string;
  const paypalEmail = formData.get('paypalEmail') as string;
  const payoneerEmail = formData.get('payoneerEmail') as string;
  const skrillEmail = formData.get('skrillEmail') as string;
  const type = formData.get('type') as string;
  const title = 'Exchange: ' + payment + ' to ' + desiredExchange as string;
  const status = 'open' as string;



  try {
    const newExchange = await prisma.ticket.create({
      data: {
        title,
        token,
        status,
        payment,
        desiredExchange,
        walletAddress,
        amount,
        cardId,
        paypalEmail,
        payoneerEmail,
        skrillEmail,
        type,
        users: {
          create: {
            userId,
          },
        },
      },
    });

    const author = user.name;
    if (!author) {
      throw new Error("User name is not available!");
    }

    const settings = await fetchSettings();
    const discordLogsEnabled = settings?.discordLogs === true;
    if (discordLogsEnabled) {
      await sendTicketNotification({ author, title: title, content: 'Exchange Ticket', ticketLink: token });
    } else {
      console.log("Discord logs are disabled in settings");
    }

    console.log("Exchange created successfully:", newExchange);
    return newExchange.token;
  } catch (err) {
    console.error("Error creating exchange:", err);
    throw err; // Rethrow the error to be handled by the calling code
  }
};


export const createTicket = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const TitleSchema = z.string().min(1).max(255);
  const ContentSchema = z.string().min(1).max(1000);

  const validatedTitle = TitleSchema.safeParse(title);
  const validatedContent = ContentSchema.safeParse(content);

  if (!validatedTitle.success) {
    console.log("Title is not valid");
    return;
  }

  if (!validatedContent.success) {
    console.log("Content is not valid");
    return;
  }

  const { userId } = auth();
  if (!userId) {
    throw new Error("User is not authenticated!");
  }

  const user = await fetchUserById(userId);
  //console.log("userid test",userId)
  if (!userId) throw new Error("User is not authenticated!");

  // Generate a secure token
  const token = crypto.randomBytes(32).toString("hex");

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        title: validatedTitle.data,
        content: validatedContent.data,
        status: "open",
        token,
        users: {
          create: {
            userId,
          },
        },
      },
    });
    const author = user.name;
    if (!author) {
      throw new Error("User is not authenticated!");
    }
    await addBotMessage(newTicket.id, content)

    const settings = await fetchSettings();
    console.log("settings", settings)
    const discordLogsEnabled = settings?.discordLogs === true;
    console.log("discordLogsEnabled", discordLogsEnabled)
    if (discordLogsEnabled) {
      await sendTicketNotification({ author, title: validatedTitle.data, content: validatedContent.data, ticketLink: token });
    } else {
      console.log("Discord logs are disabled in settings");
    }

    console.log("Ticket created successfully:", newTicket);
    return newTicket.token;
    // revalidatePath(`/c/${newTicket.token}`);
  } catch (err) {
    console.log("Error creating ticket:", err);
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
    console.error("Error checking token existence:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
};

export const getDashboardStats = async () => {
  try {
    const totalTickets = await prisma.ticket.count();
    const totalPendingTickets = await prisma.ticket.count({
      where: { status: 'pending' },
    });
    const totalClosedTickets = await prisma.ticket.count({
      where: { status: 'closed' },
    });
    const totalOpenedTickets = await prisma.ticket.count({
      where: { status: 'open' },
    });
    const totalUsers = await prisma.user.count();
    const totalVouches = await prisma.vouch.count();

    return {
      totalTickets,
      totalPendingTickets,
      totalClosedTickets,
      totalOpenedTickets,
      totalUsers,
      totalVouches,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard stats');
  }
};
