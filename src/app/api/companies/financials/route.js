import { getFinancialRecordsByIds } from "src/lib/airtable"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get("ids")

  if (!ids) {
    return new Response(JSON.stringify({ error: "No IDs provided" }), {
      status: 400,
    })
  }

  try {
    const records = await getFinancialRecordsByIds(ids.split(","))
    return new Response(JSON.stringify(records), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    })
  }
}
