import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 }, 
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

export async function POST(req: Request) {
  try {
    const newSettings = await req.json();

    const currentSettings = await prisma.settings.findUnique({
      where: { id: 1 }, 
    });

    if (!currentSettings) {
      await prisma.settings.create({
        data: newSettings,
      });
      return NextResponse.json({ message: 'Settings created successfully!' });
    }

    if (JSON.stringify(currentSettings) !== JSON.stringify(newSettings)) {
      await prisma.settings.update({
        where: { id: currentSettings.id },
        data: newSettings,
      });
      return NextResponse.json({ message: 'Settings updated successfully!' });
    } else {
      return NextResponse.json({ message: 'Settings are unchanged' });
    }
  } catch (error) {
    console.error('Failed to save settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
