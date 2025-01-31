import { NextResponse } from "next/server";
import { getBlogConfig } from "@/lib/server/config";

export async function GET() {
  const clientConfig = getBlogConfig();

  return NextResponse.json(clientConfig);
}
