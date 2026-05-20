import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    // Demo mode:
    // если ключ отсутствует или используется наша заглушка,
    // возвращаем тестовый ответ.
    if (!apiKey || apiKey === "demo_key_not_used") {
      return NextResponse.json({
        message:
          "Demo mode: Add OPENAI_API_KEY to .env.local to enable real AI responses.",
      });
    }

    // Создаём OpenAI client только с настоящим API ключом.
    const openai = new OpenAI({
      apiKey,
    });

    // Отправляем запрос в OpenAI.
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: message,
    });

    const content =
      response.output_text ||
      "No response generated.";

    return NextResponse.json({
      message: content,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        message:
          "An error occurred while processing your request.",
      },
      {
        status: 500,
      }
    );
  }
}