import Airtable from "airtable"

const companiesBase = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_COMPANIES_BASE_ID)

const productsBase = new Airtable({
  apiKey: process.env.AIRTABLE_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_PRODUCTS_BASE_ID)

export async function fetchCompanies() {
  const table = process.env.AIRTABLE_COMPANIES_TABLE

  const records = await companiesBase(table).select({ view: "Grid view" }).all()

  return records.map((record) => ({
    id: record.id,
    fields: record.fields,
  }))
}

export async function fetchModels() {
  try {
    const table = process.env.AIRTABLE_PRODUCTS_TABLE

    const records = await productsBase(table).select().all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }))
  } catch (error) {
    console.error("Airtable fetchModels error:", error)
    throw error
  }
}

export async function fetchSales() {
  try {
    const table = process.env.AIRTABLE_SALES_TABLE

    const records = await companiesBase(table).select().all()

    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }))
  } catch (error) {
    console.error("Airtable fetchSales error:", error)
    throw error
  }
}

export async function getFinancialRecordsByIds(ids) {
  const table = process.env.AIRTABLE_FINANCIALS_TABLE

  const records = await companiesBase(table)
    .select({
      filterByFormula: `OR(${ids.map((id) => `RECORD_ID()='${id}'`).join(",")})`,
    })
    .all()

  return records
}
