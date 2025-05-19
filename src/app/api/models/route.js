import { fetchModels } from "src/lib/airtable"

export async function GET() {
  try {
    const models = await fetchModels()
    return Response.json(models)
  } catch (error) {
    console.error("Fetch models error:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch models" }), {
      status: 500,
    })
  }
}
