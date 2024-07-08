"use server"

import prisma from "./client";

// Get all roles
export const getAllRoles = async () => {
  return prisma.role.findMany();
};

// Create a new role
export const createRole = async (name: string, description: string) => {
  return prisma.role.create({
    data: {
      name,
      description,
    },
  });
};
