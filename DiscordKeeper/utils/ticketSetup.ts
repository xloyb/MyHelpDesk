import { BOT_TOKEN, DISCORD_NEW_TICKET_EMBED_ID, DOMAIN } from "../config";
import { sendDiscordMessage } from "./sendDiscordMessage";

interface TicketSetupNotificationParams {
  title: string;
  description: string;
}

export const sendTicketSetupNotification = async ({ title, description }: TicketSetupNotificationParams) => {
  const buttonComponent = {
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 5, 
            label: 'Open a Ticket',
            url: `${DOMAIN}/c`, 
          },
        ],
      },
    ],
  };

  const embedContent = {
    embeds: [{
      title: title,
      description: description,
      color: 0x0099ff, 
    }],
    ...buttonComponent,
  };

  await sendDiscordMessage(DISCORD_NEW_TICKET_EMBED_ID, embedContent, BOT_TOKEN);
};
