import { SlashCommandBuilder } from '@discordjs/builders';
import { APIApplicationCommandInteraction, APIInteractionResponse } from 'discord.js';
import fetch from 'node-fetch';
import prisma from '@/lib/client';
import { BOT_TOKEN, DOMAIN, DISCORD_TICKETS_CHANNEL_ID, DISCORD_VOUCHES_CHANNEL_ID } from '../config';

// Define a custom type for the payload
type CustomMessagePayload = {
  content?: string;
  embeds?: Array<{
    title: string;
    description: string;
    color: number;
    timestamp?: Date;
  }>;
  components?: Array<{
    type: number;
    components: Array<{
      type: number;
      style: number;
      label: string;
      url: string;
    }>;
  }>;
};

export const register = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Setup command to initialize vouches and configure ticket logs.');

export const execute = async (interaction: APIApplicationCommandInteraction): Promise<APIInteractionResponse> => {
  try {
    // Fetch vouches from the database
    const vouches = await prisma.vouch.findMany();

    // Prepare embeds for vouches
    const vouchEmbeds = vouches.map((vouch) => ({
      embeds: [{
        title: `New Vouch by ${vouch.vouchedBy}`,
        description: vouch.message || 'No message provided.',
        color: 0x00AE86,
        timestamp: vouch.createdAt || undefined, // Ensure timestamp is undefined if null
      }],
    }));

    // Prepare embed for setting up ticket logs channel
    const setupEmbed: CustomMessagePayload = {
      embeds: [{
        title: 'Ticket Logs Channel Setup',
        description: 'The current channel has been set as the ticket logs channel.',
        color: 0x00AE86,
      }],
      components: [
        {
          type: 1, // Action row
          components: [
            {
              type: 2, // Button
              style: 5, // Link button
              label: 'Visit Website',
              url: `${DOMAIN}`, // Redirect to your domain
            },
          ],
        },
      ],
    };

    // Send each vouch embed to the vouches channel
    for (const embed of vouchEmbeds) {
      await sendEmbed(DISCORD_VOUCHES_CHANNEL_ID, embed);
    }

    // Send the setup embed to the ticket logs channel
    await sendEmbed(DISCORD_TICKETS_CHANNEL_ID, setupEmbed);

    // Respond to the interaction
    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        content: 'Setup complete!',
      },
    };
  } catch (error) {
    console.error('Error during setup:', error);
    return {
      type: 7, // ACK_WITH_SOURCE
      data: {
        content: 'Error occurred during setup.',
        flags: 64, // Ephemeral
      },
    };
  }
};

// Function to send an embed message to a channel
const sendEmbed = async (channelId: string, payload: CustomMessagePayload): Promise<void> => {
  try {
    // Send the message
    const url = `https://discord.com/api/v9/channels/${channelId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${BOT_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message to channel ${channelId}`);
    }
  } catch (error) {
    console.error(`Error sending embed to channel ${channelId}:`, error);
    throw new Error(`Failed to send embed to channel ${channelId}.`);
  }
};
