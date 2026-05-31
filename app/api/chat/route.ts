import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { checkRateLimit } from "@/lib/rate-limit";
import { createAuditLog } from "@/lib/audit-log";

export async function POST(request: NextRequest) {
  const forwardedFor =
    request.headers.get("x-forwarded-for") ?? "anonymous";

  const identifier = forwardedFor.split(",")[0].trim();


  try {
      const { success, limit, remaining, reset } =
          await checkRateLimit(identifier);

        if (!success) {
          return new Response(
            JSON.stringify({
              error: "Rate limit exceeded",
              message:
                "You have reached your daily message limit. Please upgrade your plan or try again later.",
              limit,
              remaining,
              reset,
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "X-RateLimit-Limit": String(limit),
                "X-RateLimit-Remaining": String(remaining),
                "X-RateLimit-Reset": String(reset),
              },
            }
          );
        }
    const {
      message,
      documents = [],
    } = await request.json();
    await createAuditLog({
      action: "chat.message_sent",
      metadata: {
        messageLength:
          typeof message === "string" ? message.length : 0,
        identifier,
        model: "gpt-5-mini",
      },
    });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "demo_key_not_used") {
      const demoText = `
      Documents received: ${documents.length}

      First document:
      ${documents[0]?.name}

      ${documents[0]?.content}
      `;

      return new Response(demoText, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }


    // Demo mode:


    const documentContext =
      documents.length > 0
        ? `
    Uploaded Documents:

    ${documents
      .map(
        (doc: {
          name: string;
          content: string;
        }) =>
          `Document: ${doc.name}

    ${doc.content}`
      )
      .join("\n\n")}
    `
        : "";

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "user",
          content: `
    ${documentContext}

    User Message:
    ${message}
    `,
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while processing your request.",
      },
      {
        status: 500,
      }
    );
  }
}