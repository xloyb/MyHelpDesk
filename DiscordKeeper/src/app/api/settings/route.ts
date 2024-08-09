import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'public/data/settings.json');
    const settingsData = await fs.readFile(filePath, 'utf-8');
    const settings = JSON.parse(settingsData);
    console.log('filePath server:', filePath);
    console.log('Fetched settings:', settings);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ message: 'Failed to fetch settings' }, { status: 500 });
  }
}
