import { NextResponse } from 'next/server';
import { updateCountry } from '@/lib/country';

export async function POST(request: Request) {
  const { id, enabled } = await request.json();

  try {
    const updatedCountry = await updateCountry(id, enabled);
    return NextResponse.json(updatedCountry);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
