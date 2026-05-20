import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // Demo mode:
    // Если ключ отсутствует или используется заглушка,
    // возвращаем тестовый URL вместо настоящего Checkout.
    if (
      !stripeSecretKey ||
      stripeSecretKey === "demo_stripe_secret_key"
    ) {
      return NextResponse.json({
        url: "/pricing?demo=1&plan=" + encodeURIComponent(plan),
      });
    }

    // Создаём Stripe client только с настоящим ключом.
    const stripe = new Stripe(stripeSecretKey);

    // Создаём Checkout Session.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 9900, // $99.00
            product_data: {
              name: `AI Chatbot SaaS Starter Kit - ${plan}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return NextResponse.json(
      {
        error: "Failed to create checkout session.",
      },
      {
        status: 500,
      }
    );
  }
}