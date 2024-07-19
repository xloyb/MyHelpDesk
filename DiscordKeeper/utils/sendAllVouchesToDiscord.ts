import { BOT_TOKEN, DISCORD_VOUCHES_CHANNEL_ID, DOMAIN } from "../config";
import { sendDiscordMessage } from "./sendDiscordMessage";

interface Vouch {
  id: number;
  message: string;
  vouchedBy: string;
  vouchedTo: string;
  createdAt: Date;
}

export const sendAllVouchesToDiscord = async (vouches: Vouch[]) => {
  for (const vouch of vouches) {
    const embedContent = {
      embeds: [{
        title: 'New Vouch Received',
        description: `A new vouch has been Added to ${vouch.vouchedTo} from ${vouch.vouchedBy}:\n\n**Message**: ${vouch.message}`,
        color: 0x00AE86,
        timestamp: vouch.createdAt.toISOString(),
      }],
      components: [
        {
          type: 1, 
          components: [
            {
              type: 2, 
              style: 5, 
              label: 'View Vouch',
              url: `${DOMAIN}/vouch/${vouch.id}`, 
            },
          ],
        },
      ],
    };

    await sendDiscordMessage(DISCORD_VOUCHES_CHANNEL_ID, embedContent, BOT_TOKEN);
  }
};
