import { NextResponse } from "next/server";
import { ErrorCodeSchema } from "@autopartsnap/shared";

export async function GET() {
  // Validate workspace link by exercising the shared schema.
  ErrorCodeSchema.parse("UNAUTHORIZED");

  return NextResponse.json({ ok: true });
}
