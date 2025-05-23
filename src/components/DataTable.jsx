"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"

export default function DataTable({
  title,
  records = [],
  blurred = false,
  visibleFields,
}) {
  const [filters, setFilters] = useState({ "Order Date": "2025 - 2026" })
  const [filteredRecords, setFilteredRecords] = useState([])

  const sample = records[0]?.fields || {}
  const keys = visibleFields || Object.keys(sample)

  const getYear = (dateStr) => {
    const date = new Date(dateStr)
    return isNaN(date.getFullYear()) ? null : date.getFullYear()
  }

  const getYearRange = (year) => {
    if (!year || isNaN(year)) return "Unknown"
    const start = Math.floor(year)
    return `${start} - ${start + 1}`
  }

  const getOrdersRange = (num) => {
    const n = Number(num)
    if (isNaN(n)) return "Unknown"
    if (n < 10) return "0-9"
    if (n < 20) return "10-19"
    if (n < 30) return "20-29"
    return "30+"
  }

  const enhancedRecords = useMemo(() => {
    return records.map((r) => {
      const newFields = { ...r.fields }

      if (newFields["Order Date"]) {
        const year = getYear(newFields["Order Date"])
        newFields["Order Date"] = getYearRange(year)
      }

      if (newFields["Number of Orders"]) {
        newFields["Orders Range"] = getOrdersRange(
          newFields["Number of Orders"]
        )
      }

      return { ...r, fields: newFields }
    })
  }, [records])

  const filterKeys = useMemo(
    () => ["Company", "Type", "Orders Range", "Order Date"],
    []
  )

  const fieldOptions = useMemo(() => {
    const options = {}
    enhancedRecords.forEach((record) => {
      filterKeys.forEach((key) => {
        const value = record.fields[key]
        if (value !== undefined) {
          options[key] = options[key] || new Set()
          options[key].add(value)
        }
      })
    })

    return Object.fromEntries(
      Object.entries(options).map(([k, v]) => [k, Array.from(v).sort()])
    )
  }, [enhancedRecords, filterKeys])

  useEffect(() => {
    const filtered = enhancedRecords.filter((r) =>
      Object.entries(filters).every(([field, value]) =>
        value ? String(r.fields[field]) === value : true
      )
    )
    setFilteredRecords(filtered)
  }, [enhancedRecords, filters])

  const columns = useMemo(() => {
    return keys.map((key) => ({
      header: key,
      accessorKey: key,
      cell: ({ row }) => {
        if (key === "Order Date") {
          return row.original._original?.["Order Date"] || "—"
        }
        return row.original[key] || "—"
      },
    }))
  }, [keys])

  const data = useMemo(() => {
    return filteredRecords.map((r) => ({
      ...r.fields,
      _original: r.fields,
    }))
  }, [filteredRecords])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="max-w-7xl mx-auto mb-20">
      <h2 className="text-4xl font-semibold mb-6 text-[#403f4c]">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {filterKeys.map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-[#403f4c] mb-1">
              {key}
            </label>
            <select
              value={filters[key] || ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  [key]: e.target.value || undefined,
                }))
              }
              className="w-full rounded-md border border-[#eaeaea] px-3 py-1 text-sm outline-none"
            >
              <option value="">All</option>
              {(fieldOptions[key] || []).map((option) => (
                <option key={option} value={option}>
                  {String(option)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="relative rounded-xl bg-[#f5f5f5] text-[#34333d] overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 pb-4">
        {blurred && (
          <div className="absolute inset-0 z-10 bg-[#f5f5f5]/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-[#403f4c] font-semibold mb-2">
                This table is only available to Pro users.
              </p>
              <button className="bg-[#d87103] duration-300 hover:text-[#403f4c] text-[#f5f5f5] px-5 py-2 rounded-md font-medium transition">
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        <table className="min-w-full border table-auto rounded-xl text-sm text-[#403f4c]">
          <thead className="bg-[#eaeaea] text-left text-xs uppercase tracking-wide">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 font-medium">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`border-t ${rowIndex % 2 === 1 ? "bg-[#eaeaea]" : ""}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
