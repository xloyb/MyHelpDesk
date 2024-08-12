import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/client';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ message: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name } = await request.json();
    if (!id || !name) {
      return NextResponse.json({ message: 'Category ID and name are required' }, { status: 400 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ message: 'Failed to update category' }, { status: 500 });
  }
}

// export async function DELETE(request: NextRequest) {
//   try {
//     const { id } = await request.json();
//     if (!id) {
//       return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
//     }

//     // Check if the category has any associated services
//     const serviceCount = await prisma.service.count({
//       where: { categoryId: Number(id) },
//     });

//     if (serviceCount > 0) {
//       return NextResponse.json({ message: 'Category cannot be deleted because it has associated services' }, { status: 400 });
//     }

//     await prisma.category.delete({
//       where: { id: Number(id) },
//     });

//     return NextResponse.json({}, { status: 204 }); // No content response
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
//   }
// }

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'Category ID is required' }, { status: 400 });
    }

    console.log(`Deleting category with ID: ${id}`); // Log ID for debugging

    await prisma.category.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 }); // No content response
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting category:', error.message);
      return NextResponse.json({ message: 'Failed to delete category', error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
    }
  }
}
