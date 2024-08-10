import prisma from "./client";

// Fetch the current settings
export async function fetchSettings() {
    try {
      const settings = await prisma.settings.findUnique({
        where: { id: 1 }, 
        include: { services: true }, 
      });
      return settings;
    } catch (error) {
      console.error("Failed to retrieve settings:", error);
      throw new Error("Failed to retrieve settings");
    }
  }