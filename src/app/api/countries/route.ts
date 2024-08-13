import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/country';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const search = url.searchParams.get('search') || '';

  const skip = (page - 1) * 10;
  const take = 10;

  try {
    const countries = await getCountries(skip, take, search);
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
