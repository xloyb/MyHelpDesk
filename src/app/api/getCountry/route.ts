// src/app/api/getCountry/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const xForwardedFor = req.headers.get('x-forwarded-for');
    const ip = xForwardedFor ? xForwardedFor.split(',')[0].trim() : '127.0.0.1';

    console.log(`Detected IP: ${ip}`); // Log the IP for debugging

    // Check if the IP is localhost or a reserved IP
    if (ip === '::1' || ip === '127.0.0.1') {
      console.log('Localhost or reserved IP detected, using default country');
      return NextResponse.json({ country_name: 'Localhost Country', country_code: 'LC' });
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (!response.ok) {
      console.error('IPAPI Error:', data);
      return NextResponse.json({ error: 'Failed to fetch country', reason: data.reason || 'Unknown reason' }, { status: response.status });
    }

    if (data.error) {
      return NextResponse.json({ error: 'Failed to fetch country', reason: data.reason || 'Unknown reason' }, { status: 400 });
    }

    return NextResponse.json({ country_name: data.country_name, country_code: data.country_code });
  } catch (error) {
    console.error('Internal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
