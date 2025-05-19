import { fetchCompanies } from "src/lib/airtable"

export async function GET() {
  try {
    const companies = await fetchCompanies()
    return Response.json(companies)
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch companies" }),
      {
        status: 500,
      }
    )
  }
}
