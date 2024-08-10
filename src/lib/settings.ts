import prisma from "./client";


export async function fetchSettings() {
    try {
    console.log('Fetching settings...');
      const settings = await prisma.settings.findFirst();
      return settings;
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      throw error;
    }
  }
  
  export async function saveSettings(newSettings: any) {
    try {
      const currentSettings = await fetchSettings();
  
      if (!currentSettings) {
        await prisma.settings.create({
          data: newSettings,
        });
        return { message: 'Settings created successfully!' };
      }
  
      if (JSON.stringify(currentSettings) !== JSON.stringify(newSettings)) {
        await prisma.settings.update({
          where: { id: currentSettings.id },
          data: newSettings,
        });
        return { message: 'Settings updated successfully!' };
      } else {
        return { message: 'Settings are unchanged' };
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }