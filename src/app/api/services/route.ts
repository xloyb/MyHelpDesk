import { NextResponse } from "next/server";
import prisma from "@/lib/client";

// GET: Fetch all services
export async function GET() {
  try {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST: Create a new service
export async function POST(req: Request) {
  try {
    const { image, title, description, price } = await req.json();

    const newService = await prisma.service.create({
      data: { image, title, description, price },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing service by ID
export async function PUT(req: Request) {
  try {
    const { id, image, title, description, price } = await req.json();
    const updatedService = await prisma.service.update({
      where: { id },
      data: { image, title, description, price },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a service by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
