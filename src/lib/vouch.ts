"use server"

import { sendAllVouchesToDiscord } from "../../utils/sendAllVouchesToDiscord";
import { sendVouchNotification } from "../../utils/sendVouchNotification";
import { fetchSettings } from "./actions"; 
import prisma from "./client";


interface Vouch {
  id: number;
  message: string;
  vouchedBy: string;
  vouchedTo: string;
  createdAt: Date;
}


interface Settings {
  discordLogs?: boolean;
}

export const createVouch = async (vouchedBy: string, vouchedTo: string, message: string) => {
  const createdVouch = await prisma.vouch.create({
    data: {
      vouchedBy,
      vouchedTo,
      message,
    },
  });
  const settings = await fetchSettings()

  const discordLogs = settings?.discordLogs === true;
  if(discordLogs){
    await sendVouchNotification({ vouchedBy, vouchedTo, message });
  } else {
    console.log("Vouch: Discord logs are disabled in settings");
  }

  return createdVouch;
};

export const SendAllVouchesToDiscord = async () => {
  try {
    const vouches = await prisma.vouch.findMany();
    const formattedVouches: Vouch[] = vouches.map(vouch => ({
      id: vouch.id,
      message: vouch.message ?? '', 
      vouchedBy: vouch.vouchedBy ?? '', 
      vouchedTo: vouch.vouchedTo ?? '', 
      createdAt: vouch.createdAt ?? new Date(), 
    }));

    if (formattedVouches.length > 0) {
      await sendAllVouchesToDiscord(formattedVouches);
      console.log('All vouches have been sent to Discord.');
    } else {
      console.log('No vouches to send.');
    }
  } catch (error) {
    console.error('Failed to send vouches to Discord:', error);
  }
};