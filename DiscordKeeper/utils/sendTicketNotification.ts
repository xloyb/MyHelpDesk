import { BOT_TOKEN, DISCORD_CHANNEL_ID, DOMAIN } from "../config";
import { sendDiscordMessage } from "./sendDiscordMessage";

interface TicketNotificationParams {
  author: string;
  title: string;
  content: string;
  ticketLink: string; 
}

export const sendTicketNotification = async ({ author, title, content, ticketLink }: TicketNotificationParams) => {
  const embedContent = {
    embeds: [{
      title: 'New Ticket Created',
      description: `A new ticket has been created by ${author}:\n\n**Title**: ${title}\n**Content**: ${content}`,
      color: 0x00AE86,
    }],
    components: [
      {
        type: 1, // Action row
        components: [
          {
            type: 2, // Button
            style: 5, // Link button
            label: 'View Ticket',
            url: `${DOMAIN}/chat/${ticketLink}`, // Construct the URL using DOMAIN and ticketLink
          },
        ],
      },
    ],
  };

  await sendDiscordMessage(DISCORD_CHANNEL_ID, embedContent, BOT_TOKEN);
};
