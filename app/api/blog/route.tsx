import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("Database connection failed");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const users = await prisma.post.findMany();
    return NextResponse.json({ message: "success", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error in Get Req", err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in post", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
