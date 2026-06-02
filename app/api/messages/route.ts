import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const {
      conversationId,
      role,
      content,
    } = await request.json();

    const message =
      await prisma.message.create({
        data: {
          conversationId,
          role,
          content,
        },
      });

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}