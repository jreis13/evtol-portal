export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import { fetchModels } from "src/lib/airtable"

export async function GET() {
  try {
    const models = await fetchModels()
    return NextResponse.json(models, {
      headers: { "cache-control": "no-store" },
    })
  } catch (error) {
    console.error("Fetch models error:", error)
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500, headers: { "cache-control": "no-store" } }
    )
  }
}
