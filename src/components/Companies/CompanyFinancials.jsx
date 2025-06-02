"use client"

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {financials.map((item, i) => {
          const { Metric, TextValue } = item.fields
          const iconKey = item.fields["Icon"]
          const iconPath = icons[iconKey] || icons["questionIcon"]

          return (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center rounded-lg bg-[#2f2e38] p-6 text-center shadow-md"
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
              <p className="mb-1 text-base font-semibold text-[#ddd]">
                {Metric}
              </p>
              <p className="text-lg text-[#bbb]">{TextValue}</p>
              <div className="absolute bottom-1 right-2 flex items-center gap-1 text-xs text-[#888]">
                {item.fields["Financials Reported in:"] && (
                  <>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <p className="text-xs text-[#888]">
                      Reported in: {item.fields["Financials Reported in:"]}
                    </p>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
