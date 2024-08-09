// src/app/api/settings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/settings.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const settings = JSON.parse(fileContent);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ message: 'Failed to fetch settings' }, { status: 500 });
  }
}
