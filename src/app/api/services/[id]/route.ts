import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

export async function PUT(request: NextRequest) {
  try {
    // Extract ID from the URL
    const { pathname } = new URL(request.url);
    const id = pathname.split('/').pop(); // Assuming the last segment is the ID

    if (!id) {
      return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { image, title, description, price, categoryId, amount, buyOrSellType } = body;

    if (!image || !title || !description || price == null || !categoryId || amount == null || !buyOrSellType) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const updatedService = await prisma.service.update({
      where: { id: Number(id) },
      data: { image, title, description, price, categoryId, amount, buyOrSellType },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ message: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        await prisma.service.delete({
            where: {
                id: parseInt(id, 10), // assuming id is an integer
            },
        });
        return NextResponse.json({ message: 'Service deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting service' }, { status: 500 });
    }
}
