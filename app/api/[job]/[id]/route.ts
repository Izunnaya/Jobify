// app/api/[job]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  context: { params: { job: string; id: string } }
) {
  try {
    // @ts-expect-error -- we know this is safe for some reason
    const { job, id } = context.params;

    // Example: if your DB only needs `id`, that's fine—just pass it here
    const post = await prisma.jobPosting.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.error('Error fetching job posting:', err);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
