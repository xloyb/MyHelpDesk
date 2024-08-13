import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/country';

export async function GET(request: Request) {
  try {
    const countries = await getCountries();
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
