import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const conversation =
      await prisma.conversation.create({
        data: {
          title: "New Chat",
        },
      });

    return NextResponse.json({
      success: true,
      conversation,
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