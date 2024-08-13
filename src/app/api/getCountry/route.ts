import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ country: data.country_name });
    } else {
      return NextResponse.json({ error: 'Failed to fetch country' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
