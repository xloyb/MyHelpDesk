import prisma from "./client";

export const addBotMessage = async (
    ticketId: number,
    content: string
  ): Promise<void> => {
    console.log("Adding bot message:", ticketId, content);
    try {
      await prisma.comment.create({
        data: {
          content: content,
          ticketId: ticketId,
          userId: process.env.SITE_BOT_ID,
        },
      });
    } catch (error) {
      console.error("Error adding bot message:", error);
      throw new Error("Failed to add bot message");
    }
  };
  