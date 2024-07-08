"use server"

import prisma from "./client";


// Get all vouches
export const getAllVouches = async () => {
  return prisma.vouch.findMany({
    include: {
      vouchedByUser: true,
      vouchedToUser: true,
    },
  });
};

// Create a vouch
export const createVouch = async (vouchedBy: string, vouchedTo: string, message: string) => {
  return prisma.vouch.create({
    data: {
      vouchedBy,
      vouchedTo,
      message,
    },
  });
};
