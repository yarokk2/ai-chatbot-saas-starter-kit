import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("UPLOAD API HIT");

    const formData = await request.formData();

    const files = formData.getAll("files");

    const file = files[0] as File;

    const text = await file.text();

    console.log("FILE CONTENT:");
    console.log(text);


    console.log("FILES:", files);

    return NextResponse.json({
      success: true,
      content: text,
      fileName: file.name,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}