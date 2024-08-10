import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst({
      include: { services: true }, 
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
