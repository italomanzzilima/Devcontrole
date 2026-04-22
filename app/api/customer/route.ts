import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, address } = await request.json();
  const userId = session.user.id;

  try {
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId,
      },
    });
    return NextResponse.json(
      { message: "Cliente cadastrado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create new user" },
      { status: 400 },
    );
  }
}
