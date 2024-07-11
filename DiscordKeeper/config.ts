if (!process.env.NEXT_PUBLIC_APPLICATION_ID) throw new Error("APPLICATION_ID is not set");
if (!process.env.BOT_TOKEN) throw new Error("BOT_TOKEN is not set");
if (!process.env.PUBLIC_KEY) throw new Error("PUBLIC_KEY is not set");
if (!process.env.DOMAIN) throw new Error("DOMAIN is not set");
if (!process.env.DISCORD_CHANNEL_ID) throw new Error("DISCORD_CHANNEL_ID is not set");
if (!process.env.DISCORD_VOUCHES_CHANNEL_ID) throw new Error("DISCORD_VOUCHES_CHANNEL_ID is not set");


export const CLIENT_APPLICATION_ID = process.env.NEXT_PUBLIC_CLIENT_APPLICATION_ID!;
export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const DOMAIN = process.env.DOMAIN!;
export const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID!;
export const DISCORD_VOUCHES_CHANNEL_ID = process.env.DISCORD_VOUCHES_CHANNEL_ID!;

