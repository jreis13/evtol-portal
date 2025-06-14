import { NextResponse } from "next/server"

let stockCache = {}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const symbol = searchParams.get("symbol")
  const key = process.env.ALPHA_VANTAGE_API_KEY

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 })
  }

  const cached = stockCache[symbol]
  const now = Date.now()

  if (cached && now - cached.timestamp < 15 * 60 * 1000) {
    return NextResponse.json(cached.data, {
      headers: { "cache-control": "no-store" },
    })
  }

  try {
    const [quoteRes, overviewRes] = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`
      ),
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`
      ),
    ])

    const quote = await quoteRes.json()
    const overview = await overviewRes.json()

    const payload = { quote, overview }

    stockCache[symbol] = {
      data: payload,
      timestamp: now,
    }

    return NextResponse.json(payload, {
      headers: { "cache-control": "no-store" },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500, headers: { "cache-control": "no-store" } }
    )
  }
}
