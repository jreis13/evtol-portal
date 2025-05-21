"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import icons from "src/common/icons"

export default function CompanyFinancials({ recordIds = [] }) {
  const [financials, setFinancials] = useState([])

  useEffect(() => {
    if (!recordIds.length) return

    const ids = recordIds.join(",")
    fetch(`/api/companies/financials?ids=${ids}`)
      .then((res) => res.json())
      .then(setFinancials)
      .catch(console.error)
  }, [recordIds])

  if (!recordIds.length || !financials.length) return null

  return (
    <div className="flex flex-col py-4 lg:pt-8">
      <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">Financials</h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {financials.map((item, i) => {
          const { Metric, TextValue } = item.fields
          const iconKey = item.fields["Icon"]
          const iconPath = icons[iconKey] || icons["questionIcon"]

          return (
            <div
              key={i}
              className="bg-[#2f2e38] rounded-lg p-6 shadow-md text-center relative flex flex-col justify-center items-center"
            >
              {iconPath && (
                <Image
                  src={iconPath}
                  alt={Metric}
                  height={48}
                  width={48}
                  className="mb-2"
                />
              )}
              <p className="text-md text-[#ddd] font-semibold mb-1">{Metric}</p>
              <p className="text-lg text-[#bbb]">{TextValue}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
