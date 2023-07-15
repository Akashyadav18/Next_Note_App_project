import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const user = await prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ message: "success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in single user" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: {
        title,
        description,
      },
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in update user" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const remove = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "success", remove }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error in delete user" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
