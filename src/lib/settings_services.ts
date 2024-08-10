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



  // Update the settings
export async function saveSettings(settingsData: {
    sitename: string;
    announcement: string;
    offer: string;
    logo: string;
    theme: string;
    discordLogs: boolean;
    services: {
      id: number;
      image: string;
      title: string;
      description: string;
      price: number;
    }[];
  }) {
    try {
      const updatedSettings = await prisma.settings.update({
        where: { id: 1 }, 
        data: {
          sitename: settingsData.sitename,
          announcement: settingsData.announcement,
          offer: settingsData.offer,
          logo: settingsData.logo,
          theme: settingsData.theme,
          discordLogs: settingsData.discordLogs,
        },
      });
  
      const serviceUpdates = settingsData.services.map(service => 
        prisma.service.upsert({
          where: { id: service.id || 0 },
          update: {
            image: service.image,
            title: service.title,
            description: service.description,
            price: service.price,
          },
          create: {
            image: service.image,
            title: service.title,
            description: service.description,
            price: service.price,
            settingsId: 1, 
          },
        })
      );
  
      await prisma.$transaction(serviceUpdates); 
  
      return updatedSettings;
    } catch (error) {
      console.error("Failed to save settings:", error);
      throw new Error("Failed to save settings");
    }
  }