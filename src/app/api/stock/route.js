import { NextResponse } from "next/server"
import { createClient } from "redis"

const redis = createClient({ url: process.env.REDIS_URL })

let connected = false
async function ensureConnected() {
  if (!connected) {
    await redis.connect()
    connected = true
  }
}

export async function GET(req) {
  await ensureConnected()

  const { searchParams } = new URL(req.url)
  const symbol = searchParams.get("symbol")
  const key = process.env.ALPHA_VANTAGE_API_KEY

  if (!symbol) {
    return NextResponse.json({ error: "Missing symbol" }, { status: 400 })
  }

  const cacheKey = `stock:${symbol}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    const parsed = JSON.parse(cached)
    const age = Date.now() - parsed.timestamp
    if (age < 15 * 60 * 1000) {
      return NextResponse.json(
        {
          ...parsed.data,
          timestamp: parsed.timestamp,
        },
        {
          headers: { "cache-control": "no-store" },
        }
      )
    }
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

    await redis.set(
      cacheKey,
      JSON.stringify({ data: payload, timestamp: Date.now() })
    )

    return NextResponse.json(
      {
        ...payload,
        timestamp: Date.now(),
      },
      {
        headers: { "cache-control": "no-store" },
      }
    )
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json(
      { error: "Failed to fetch stock data" },
      { status: 500, headers: { "cache-control": "no-store" } }
    )
  }
}
