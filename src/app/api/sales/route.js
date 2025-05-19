import { fetchCompanies, fetchSales } from "src/lib/airtable"

export async function GET() {
  try {
    const [sales, companies] = await Promise.all([
      fetchSales(),
      fetchCompanies(),
    ])

    // Create a lookup table for company ID → Company Name
    const companyMap = Object.fromEntries(
      companies.map((company) => [company.id, company.fields["Company Name"]])
    )

    // Map company IDs to names in sales
    const enrichedSales = sales.map((sale) => {
      const companyId = Array.isArray(sale.fields.Company)
        ? sale.fields.Company[0]
        : sale.fields.Company

      return {
        ...sale,
        fields: {
          ...sale.fields,
          Company: companyMap[companyId] || "Unknown Company",
        },
      }
    })

    return Response.json(enrichedSales)
  } catch (error) {
    console.error("Error in GET /api/sales:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch sales" }), {
      status: 500,
    })
  }
}
