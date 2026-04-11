import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { gateway } = body;

  return NextResponse.json(
    {
      ok: false,
      gateway,
      message: "Online payment is not enabled yet.",
    },
    { status: 501 }
  );
}
