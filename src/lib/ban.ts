
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


  export const unbanUser = async (userId: string): Promise<void> => {
    try {
      await prisma.ban.deleteMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      console.error('Error unbanning user:', error);
      throw new Error('Failed to unban user');
    }
  };


  export const banDetails = async (userId: string) => {
    try {
      const ban = await prisma.ban.findFirst({
        where: {
          userId,
        },
        include: {
          user: true,
          staff: true,
        },
      });
  
      return ban; 
    } catch (error) {
      console.error('Error fetching ban details:', error);
      throw new Error('Failed to fetch ban details');
    }
  };


  export const isSelfBanAttempt = async (modId: string, userId: string): Promise<boolean> => {
    return modId === userId;
  };
  