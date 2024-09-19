
// import { NextRequest, NextResponse } from 'next/server';
// import { isCountryEnabled } from '@/lib/country'; 

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const shortname = searchParams.get('shortname');

//   if (!shortname) {
//     return NextResponse.json({ error: 'shortname parameter is required' }, { status: 400 });
//   }

//   try {
//     const enabled = await isCountryEnabled(shortname);
//     return NextResponse.json({ enabled });
//   } catch (error) {
//     console.error('Error checking country status:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import prisma from '@/lib/client';
import { NextRequest, NextResponse } from 'next/server';

async function fetchCountryByIp(ip: string) {
  if (ip === '::1' || ip === '127.0.0.1') {
    return { country_code: 'LC' }; 
  }
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();
  if (!response.ok) throw new Error('Failed to fetch country');
  return { country_code: data.country_code };
}

async function checkCountryStatus(code: string) {
  const country = await prisma.country.findUnique({
    where: { shortname: code },
  });
  return country ? country.enabled : false;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

  try {
    const { country_code } = await fetchCountryByIp(ip);
    const isEnabled = await checkCountryStatus(country_code);
    return NextResponse.json({ country_code, isEnabled });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

