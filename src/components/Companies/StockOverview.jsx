"use client"

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

export default function StockOverview({ symbol }) {
  const [data, setData] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  useEffect(() => {
    if (!symbol) return

    const key = `stock_${symbol}`
    const cached = sessionStorage.getItem(key)

    if (cached) {
      const parsed = JSON.parse(cached)
      const age = Date.now() - parsed.timestamp
      if (age < 15 * 60 * 1000) {
        setData(parsed.data)
        setLastFetched(new Date(parsed.timestamp))
        return
      }
    }

    fetch(`/api/stock?symbol=${symbol}`)
      .then((res) => res.json())
      .then((fresh) => {
        setData(fresh)
        setLastFetched(new Date())
        sessionStorage.setItem(
          key,
          JSON.stringify({ data: fresh, timestamp: Date.now() })
        )
      })
      .catch(console.error)
  }, [symbol])

  if (!data || !data.quote?.["Global Quote"]) return null

  const quote = data.quote["Global Quote"]
  const overview = data.overview || {}

  const price = parseFloat(quote["05. price"])
  const change = parseFloat(quote["09. change"])
  const changePercent = quote["10. change percent"]
  const open = parseFloat(quote["02. open"])
  const high = parseFloat(quote["03. high"])
  const low = parseFloat(quote["04. low"])

  const now = new Date()
  const timestamps = Array(10)
    .fill(0)
    .map((_, i) =>
      new Date(now.getTime() - (9 - i) * 15 * 60 * 1000).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    )

  const simulatedData = Array(10)
    .fill(0)
    .map((_, i) => price + Math.sin(i / 2) * 0.3)

  return (
    <div className="flex flex-col py-4 lg:pt-8">
      <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">
        Stock Overview
      </h3>
      <div className="rounded-lg bg-[#1e1e1e] p-6 text-white shadow-lg">
        <h2 className="mb-2 text-xl text-[#e8e8e8]">
          {overview.Name || symbol}
        </h2>
        <div className="flex items-end gap-3">
          <h2 className="text-4xl font-bold text-green-400">
            {price.toFixed(2)} USD
          </h2>
          <p
            className={`text-sm font-medium ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)} ({changePercent})
          </p>
        </div>

        {lastFetched && (
          <p className="mt-1 text-sm text-gray-400">
            Updated:{" "}
            {lastFetched.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}

        <div className="relative my-4 h-64 w-full">
          <Line
            data={{
              labels: timestamps,
              datasets: [
                {
                  data: simulatedData,
                  borderColor: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  ticks: {
                    color: "#bbb",
                  },
                },
                y: {
                  ticks: {
                    color: "#bbb",
                  },
                },
              },
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 md:grid-cols-3">
          <div>
            <p className="text-xs text-[#d87103]">Open</p>
            <p className="text-[#bbb]">${open.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-green-400">High (24h)</p>
            <p className="text-[#bbb]">${high.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-red-500">Low (24h)</p>
            <p className="text-[#bbb]">${low.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-[#d87103]">Market Cap</p>
            <p className="text-[#bbb]">
              {overview.MarketCapitalization
                ? `$${(overview.MarketCapitalization / 1e9).toFixed(2)}B`
                : "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-green-400">Year High</p>
            <p className="text-[#bbb]">${overview["52WeekHigh"] || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-red-500">Year Low</p>
            <p className="text-[#bbb]">${overview["52WeekLow"] || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
