import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json(
      { error: "failed to update ticket" },
      { status: 400 },
    );
  }

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "closed",
      },
    });

    return NextResponse.json({ message: "Ticket updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to update ticket", cause: error },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { error: "failed to create ticket" },
      { status: 400 },
    );
  }

  try {
    await prisma.ticket.create({
      data: {
        name,
        description,
        status: "open",
        customerId: customerId,
      },
    });

    return NextResponse.json({ message: "Ticket updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to create ticket", cause: error },
      { status: 400 },
    );
  }
}
