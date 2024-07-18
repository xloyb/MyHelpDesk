
"use server"

import prisma from "./client";
import { fetchUserById } from "./user";


export async function createBan(userId: string, staffId: string, reason: string) {
    try {
      const ban = await prisma.ban.create({
        data: {
          userId: userId,
          staffId: staffId,
          reason: reason,
        },
      });
  
      console.log('Ban created:', ban);
      return ban;
    } catch (error) {
      console.error('Error creating ban:', error);
      throw new Error('Failed to create ban');
    }
  }
  
  export const CanBan = async (userId: string): Promise<boolean> => {
    try {
      const user = await fetchUserById(userId);
      return [3, 4].includes(user.roleId);
    } catch (err) {
      console.error('Error checking if user Can access to ban: ', err);
      throw err;
    }
  };
  
  
  export const isBanned = async (userId: string): Promise<boolean> => {
    try {
      const ban = await prisma.ban.findFirst({
        where: {
          userId,
        },
      });
  
      return !!ban; 
    } catch (error) {
      console.error('Error checking ban status:', error);
      throw new Error('Failed to check ban status');
    }
  };