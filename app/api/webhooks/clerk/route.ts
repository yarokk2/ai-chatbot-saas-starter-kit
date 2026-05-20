import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // Здесь позже будет:
    // - user.created
    // - user.updated
    // - organization.created
    // - запись в Audit Logs

    console.log("Clerk webhook received", body);

    return NextResponse.json({
      received: true,
      provider: "clerk",
    });
  } catch (error) {
    console.error("Clerk webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}