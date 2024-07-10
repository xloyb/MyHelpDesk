import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'public/data/settings.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: 'Settings saved successfully!' });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ message: 'Failed to save settings' }, { status: 500 });
  }
}
