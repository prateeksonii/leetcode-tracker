import { prisma } from "@/server/db";
import { auth } from "@clerk/nextjs/app-beta";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  const body = await request.json();

  if (!userId)
    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 401,
      }
    );

  const problem = await prisma.userProblem.findFirst({
    where: {
      User: {
        clerkUserId: userId,
      },
      problemUrl: body.problemUrl,
    },
  });

  if (problem) {
    return NextResponse.json(
      {
        ok: false,
      },
      {
        status: 409,
      }
    );
  }

  return prisma.userProblem.create({
    data: {
      problemUrl: body.problemUrl,
      User: {
        connect: {
          clerkUserId: userId,
        },
      },
    },
  });
}
