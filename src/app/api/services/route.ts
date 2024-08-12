import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

// export async function GET() {
//   try {
//     const services = await prisma.service.findMany({
//       include: {
//         category: true 
//       }
//     });
//     return NextResponse.json(services);
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
//   }
// }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  try {
    if (categoryId) {
      // If categoryId is provided, count the number of services for that category
      const count = await prisma.service.count({
        where: { categoryId: Number(categoryId) },
      });
      return NextResponse.json({ count });
    } else {
      // If no categoryId is provided, fetch all services
      const services = await prisma.service.findMany();
      return NextResponse.json(services);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
  try {
    const { image, title, description, price, categoryId } = await request.json();
    if (!image || !title || !description || price == null || !categoryId) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: { image, title, description, price, categoryId },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ message: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, image, title, description, price, categoryId } = await request.json();
    if (!id || !image || !title || !description || price == null || !categoryId) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const updatedService = await prisma.service.update({
      where: { id: Number(id) },
      data: { image, title, description, price, categoryId },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ message: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });
    }

    await prisma.service.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 }); 
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ message: 'Failed to delete service' }, { status: 500 });
  }
}


