// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

//   try {
//     const response = await fetch(`https://ipapi.co/${ip}/json/`);
//     const data = await response.json();

//     if (response.ok) {
//       return NextResponse.json({ country: data.country_name });
//     } else {
//       return NextResponse.json({ error: 'Failed to fetch country' }, { status: response.status });
//     }
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    // Check if the IP is localhost or a reserved IP
    if (ip === '::1' || ip === '127.0.0.1') {
      console.log('Localhost or reserved IP detected, using default country');
      return NextResponse.json({ country_name: 'Localhost Country', country_code: 'LC' });
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (response.ok && !data.error) {
      return NextResponse.json({ country_name: data.country_name, country_code: data.country_code });
    } else {
      return NextResponse.json({ error: 'Failed to fetch country', reason: data.reason || 'Unknown reason' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
