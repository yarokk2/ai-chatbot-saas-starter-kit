import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // Здесь позже будет:
    // - проверка подписи Stripe
    // - обработка checkout.session.completed
    // - обновление подписки
    // - запись в Audit Logs

    console.log("Stripe webhook received", body);

    return NextResponse.json({
      received: true,
      provider: "stripe",
    });
  } catch (error) {
    console.error("Stripe webhook error:", error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}