"use server"

import prisma from "./client";

// Get all users
export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      role: true,
    },
  });
};

// Update user role
export const updateUserRole = async (userId: string, roleId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { roleId },
  });
};
