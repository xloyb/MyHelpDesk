import axios from "axios";
import prisma from "./client";

export async function fetchSettings() {
  try {
    const response = await axios.get('http://localhost:3000/api/settings');
    console.log('Fetched setting:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    throw new Error('Failed to fetch settings');
  }
}


// export async function saveSettings(newSettings: any) {
//     try {
//       const currentSettings = await fetchSettings();
  
//       if (!currentSettings) {
//         await prisma.settings.create({
//           data: newSettings,
//         });
//         return { message: 'Settings created successfully!' };
//       }
  
//       if (JSON.stringify(currentSettings) !== JSON.stringify(newSettings)) {
//         await prisma.settings.update({
//           where: { id: currentSettings.id },
//           data: newSettings,
//         });
//         return { message: 'Settings updated successfully!' };
//       } else {
//         return { message: 'Settings are unchanged' };
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error('Failed to save settings:', error.message);
//         throw new Error(`Failed to save settings: ${error.message}`);
//       } else {
//         console.error('An unknown error occurred.');
//         throw new Error('An unknown error occurred.');
//       }
//     }
//   }

export async function saveSettings(newSettings: any) {
  try {
    if (typeof window !== 'undefined') {
      throw new Error("Prisma should not be executed on the client side.");
    }

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to save settings:', error.message);
      throw new Error(`Failed to save settings: ${error.message}`);
    } else {
      console.error('An unknown error occurred.');
      throw new Error('An unknown error occurred.');
    }
  }
}
  