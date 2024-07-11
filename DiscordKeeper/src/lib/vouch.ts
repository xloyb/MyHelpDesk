"use server"

import { sendVouchNotification } from "../../utils/sendVouchNotification";
import prisma from "./client";

// Create a vouch
export const createVouch = async (vouchedBy: string, vouchedTo: string, message: string) => {
  const createdVouch = await prisma.vouch.create({
    data: {
      vouchedBy,
      vouchedTo,
      message,
    },
  });

  await sendVouchNotification({ vouchedBy, vouchedTo, message });

  return createdVouch;
};

