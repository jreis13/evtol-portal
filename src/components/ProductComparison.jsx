import { useEffect, useMemo, useState } from "react"
import Dropdown from "./Dropdown"
import ProductChart from "./ProductChart"

export default function ProductComparison({ items = [], config = {} }) {
  const { titleField = "Name" } = config

  const allAttributes = useMemo(() => {
    const attrs = new Set()
    items.forEach((item) => {
      Object.keys(item.fields).forEach((key) => {
        if (key !== titleField && key.toLowerCase() !== "image") {
          attrs.add(key)
        }
      })
    })
    return Array.from(attrs)
  }, [items, titleField])

  const numericAttributes = useMemo(() => {
    const pattern = /^[\d,.]+\s*(km|km\/h|%|m|ft)?$/i
    return allAttributes
      .filter((attr) =>
        items.some((item) => {
          const v = item.fields[attr]
          if (typeof v === "number") return true
          if (typeof v === "string") {
            return pattern.test(v.trim())
          }
          return false
        })
      )
      .filter((attr) => attr !== "Range" && attr !== "Top Speed")
  }, [allAttributes, items])

  const graphTypesSingle = useMemo(
    () => ["Bar", "Doughnut", "Polar Area", "Radar"],
    []
  )
  const graphTypesDouble = useMemo(() => ["Radar", "Bar", "Line"], [])

  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")
  const [graphType, setGraphType] = useState("")

  useEffect(() => {
    if (!xAttribute && numericAttributes.length) {
      setXAttribute(numericAttributes[0])
    }
  }, [numericAttributes, xAttribute])

  useEffect(() => {
    setGraphType(yAttribute ? graphTypesDouble[0] : graphTypesSingle[0])
  }, [graphTypesDouble, graphTypesSingle, yAttribute])

  const labels = items.map((item) => item.fields[titleField] || "")

  const extractData = (attr) => {
    return items.map((item) => {
      const v = item.fields[attr]
      const n =
        typeof v === "number"
          ? v
          : typeof v === "string"
            ? parseFloat(v.replace(/[^0-9.]/g, ""))
            : NaN
      return isNaN(n) ? null : n
    })
  }

  const xData = xAttribute ? extractData(xAttribute) : []
  const yData = yAttribute ? extractData(yAttribute) : []

  if (!items.length) {
    return (
      <div className="text-center py-8">No items available for comparison</div>
    )
  }

  const availableGraphTypes = yAttribute ? graphTypesDouble : graphTypesSingle

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <Dropdown
          attributes={numericAttributes}
          selectedValue={xAttribute}
          onChange={(value) => {
            if (value === yAttribute) {
              setYAttribute("")
            }
            setXAttribute(value)
          }}
        />
        <Dropdown
          attributes={[
            "None",
            ...numericAttributes.filter((a) => a !== xAttribute),
          ]}
          selectedValue={yAttribute || "None"}
          onChange={(value) => setYAttribute(value === "None" ? "" : value)}
        />
        <Dropdown
          attributes={availableGraphTypes}
          selectedValue={graphType}
          onChange={setGraphType}
          className="ml-auto"
        />
      </div>
      {xData.length > 0 && (
        <ProductChart
          labels={labels}
          xData={xData}
          yData={yData}
          xLabel={xAttribute}
          yLabel={yAttribute}
          graphType={graphType}
        />
      )}
    </div>
  )
}
