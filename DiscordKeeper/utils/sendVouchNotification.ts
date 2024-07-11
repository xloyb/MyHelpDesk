import { BOT_TOKEN, DISCORD_VOUCHES_CHANNEL_ID, DOMAIN } from "../config";
import { sendDiscordMessage } from "./sendDiscordMessage";

interface VouchNotificationParams {
  vouchedBy: string;
  vouchedTo: string;
  message: string;
}

export const sendVouchNotification = async ({ vouchedBy, vouchedTo, message }: VouchNotificationParams) => {
  const embedContent = {
    embeds: [{
      title: 'New Vouch Created',
      description: `A new vouch has been created by ${vouchedBy} for ${vouchedTo}:\n\n**Message**: ${message}`,
      color: 0x00AE86, 
    }],
  };

  await sendDiscordMessage(DISCORD_VOUCHES_CHANNEL_ID, embedContent, BOT_TOKEN);
};
