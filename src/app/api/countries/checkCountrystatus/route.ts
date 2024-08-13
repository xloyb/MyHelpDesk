
import { NextRequest, NextResponse } from 'next/server';
import { isCountryEnabled } from '@/lib/country'; 

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shortname = searchParams.get('shortname');

  if (!shortname) {
    return NextResponse.json({ error: 'shortname parameter is required' }, { status: 400 });
  }

  try {
    const enabled = await isCountryEnabled(shortname);
    return NextResponse.json({ enabled });
  } catch (error) {
    console.error('Error checking country status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
