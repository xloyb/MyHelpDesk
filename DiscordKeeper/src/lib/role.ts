"use server"

import prisma from "./client";


// Fetch all roles
export const getAllRoles = async () => {
  try {
    const roles = await prisma.role.findMany();
    return roles;
  } catch (err) {
    console.error('Error fetching roles:', err);
    throw err;
  }
};


// Update role name and description
export const updateRole = async (roleId: number, name: string, description: string) => {
  try {
    const updatedRole = await prisma.role.update({
      where: { id: roleId },
      data: {
        name,
        description,
      },
    });
    return updatedRole;
  } catch (err) {
    console.error('Error updating role:', err);
    throw err;
  }
};
