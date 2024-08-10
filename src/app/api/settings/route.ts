// // src/app/api/settings/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';


// export async function GET() {
//   try {
//     const filePath = path.join(process.cwd(), 'public/data/settings.json');
//     const fileContent = await fs.readFile(filePath, 'utf-8');
//     const settings = JSON.parse(fileContent);
//     return NextResponse.json(settings);
//   } catch (error) {
//     console.error('Error reading settings:', error);
//     return NextResponse.json({ message: 'Failed to fetch settings' }, { status: 500 });
//   }
// }



// import { deleteService, fetchSettings, saveSettings } from '@/lib/settings_services';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const settings = await fetchSettings();
//     return NextResponse.json(settings);
//   } catch (error) {
//     console.error('Failed to fetch settings:', error);
//     return NextResponse.error();
//   }
// }

// export async function POST(request: Request) {
//   const data = await request.json();
//   try {
//     await saveSettings(data);
//     return NextResponse.json({ message: 'Settings saved successfully!' });
//   } catch (error) {
//     console.error('Failed to save settings:', error);
//     return NextResponse.error();
//   }
// }

// export async function DELETE(request: Request) {
//   const { serviceId } = await request.json();
//   try {
//     await deleteService(serviceId);
//     return NextResponse.json({ message: 'Service deleted successfully!' });
//   } catch (error) {
//     console.error('Failed to delete service:', error);
//     return NextResponse.error();
//   }
// }

// import { getSettings } from "@/lib/settings_services";
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const settings = await getSettings();
//     return NextResponse.json(settings);
//   } catch (error) {
//     console.error('Failed to fetch settings:', error);
//     return NextResponse.error();
//   }
// }



import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 }
    });

    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
