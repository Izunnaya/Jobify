import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = await params;

  try {
    const post = await prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!post) {
      return new NextResponse(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(post, null, 2), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, null, 2),
      { status: 500 }
    );
  }
};