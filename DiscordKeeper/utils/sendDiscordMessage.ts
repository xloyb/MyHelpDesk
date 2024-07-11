import fetch from 'node-fetch';

export async function sendDiscordMessage(channelId: string, content: any, botToken: string) {
  const url = `https://discord.com/api/v10/channels/${channelId}/messages`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${botToken}`
    },
    body: JSON.stringify(content)
  });

  if (!response.ok) {
    throw new Error(`Failed to send message: ${response.statusText}`);
  }
}
