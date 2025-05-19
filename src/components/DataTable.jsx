"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from "react"

export default function DataTable({ title, records = [], blurred = false }) {
  const columns = React.useMemo(() => {
    const sample = records[0]?.fields || {}
    return Object.keys(sample).map((key) => ({
      header: key,
      accessorKey: key,
    }))
  }, [records])

  const data = React.useMemo(() => {
    if (!Array.isArray(records)) return []
    return records.map((r) => r.fields)
  }, [records])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="max-w-7xl mx-auto mb-20">
      <h2 className="text-4xl font-semibold mb-12 text-[#403f4c]">{title}</h2>

      <div className="relative rounded-xl bg-[#f5f5f5] text-[#34333d] overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 pb-4">
        {blurred && (
          <div className="absolute inset-0 z-10 bg-[#f5f5f5]/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-[#403f4c] font-semibold mb-2">
                This table is only available to Pro users.
              </p>
              <button className="bg-[#d87103] duration-300 hover:text-[#403f4c] text-white px-5 py-2 rounded-md font-medium transition">
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-200">
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
