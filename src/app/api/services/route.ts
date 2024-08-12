// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/client';

// // export async function GET() {
// //   try {
// //     const services = await prisma.service.findMany({
// //       include: {
// //         category: true 
// //       }
// //     });
// //     return NextResponse.json(services);
// //   } catch (error) {
// //     console.error('Error fetching services:', error);
// //     return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
// //   }
// // }

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const categoryId = searchParams.get('categoryId');

//   try {
//     if (categoryId) {
//       // If categoryId is provided, count the number of services for that category
//       const count = await prisma.service.count({
//         where: { categoryId: Number(categoryId) },
//       });
//       return NextResponse.json({ count });
//     } else {
//       // If no categoryId is provided, fetch all services
//       const services = await prisma.service.findMany();
//       return NextResponse.json(services);
//     }
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
//   }
// }



// export async function POST(request: NextRequest) {
//   try {
//     const { image, title, description, price, categoryId } = await request.json();
//     if (!image || !title || !description || price == null || !categoryId) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const newService = await prisma.service.create({
//       data: { image, title, description, price, categoryId },
//     });

//     return NextResponse.json(newService, { status: 201 });
//   } catch (error) {
//     console.error('Error creating service:', error);
//     return NextResponse.json({ message: 'Failed to create service' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const { id, image, title, description, price, categoryId } = await request.json();
//     if (!id || !image || !title || !description || price == null || !categoryId) {
//       return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const updatedService = await prisma.service.update({
//       where: { id: Number(id) },
//       data: { image, title, description, price, categoryId },
//     });

//     return NextResponse.json(updatedService);
//   } catch (error) {
//     console.error('Error updating service:', error);
//     return NextResponse.json({ message: 'Failed to update service' }, { status: 500 });
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { id } = await request.json();
//     if (!id) {
//       return NextResponse.json({ message: 'Service ID is required' }, { status: 400 });
//     }

//     await prisma.service.delete({
//       where: { id: Number(id) },
//     });

//     return NextResponse.json({}, { status: 204 }); 
//   } catch (error) {
//     console.error('Error deleting service:', error);
//     return NextResponse.json({ message: 'Failed to delete service' }, { status: 500 });
//   }
// }

import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

// Handler for POST request to create a new service
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const { image, title, description, price, categoryId, amount, buyOrSellType } = data;

    // Validate the required fields
    if (!image || !title || !description || price === undefined || !categoryId || amount === undefined || !buyOrSellType) {
      return new NextResponse('All fields are required.', { status: 400 });
    }

    // Additional validation for numbers
    if (isNaN(parseFloat(price)) || isNaN(parseInt(categoryId, 10)) || isNaN(parseInt(amount, 10))) {
      return new NextResponse('Invalid number format.', { status: 400 });
    }

    // Create the new service
    const newService = await prisma.service.create({
      data: {
        image,
        title,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId, 10),
        amount: parseInt(amount, 10),
        buyOrSellType,
      },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error('Error creating service:', error);
    return new NextResponse('Error creating service.', { status: 500 });
  }
}



// Handler for PUT request to update an existing service
export async function PUT(request: Request) {
  try {
    const { id, image, title, description, price, categoryId, amount, buyOrSellType } = await request.json();

    // Validate the required fields
    if (!id || !image || !title || !description || !price || !categoryId || !amount || !buyOrSellType) {
      return new NextResponse('All fields are required.', { status: 400 });
    }

    // Update the existing service
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id, 10) },
      data: {
        image,
        title,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId, 10),
        amount: parseInt(amount, 10),
        buyOrSellType,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return new NextResponse('Error updating service.', { status: 500 });
  }
}

// Handler for GET request to fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return new NextResponse('Error fetching services.', { status: 500 });
  }
}
