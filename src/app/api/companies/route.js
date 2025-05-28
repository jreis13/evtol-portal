export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import { fetchCompanies } from "src/lib/airtable"

export async function GET() {
  try {
    const companies = await fetchCompanies()
    return NextResponse.json(companies, {
      headers: { "cache-control": "no-store" },
    })
  } catch (error) {
    console.error("Fetch companies error:", error)
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500, headers: { "cache-control": "no-store" } }
    )
  }
}
