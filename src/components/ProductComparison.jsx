"use client"

import { useEffect, useMemo, useState } from "react"
import Dropdown from "./Dropdown"
import ProductChart from "./ProductChart"

export default function ProductComparison({ items = [], config = {} }) {
  const { titleField = "Name" } = config

  const suitabilityOptions = useMemo(() => {
    const orderedOptions = [
      "Urban Air Mobility",
      "Suburban Air Mobility",
      "Regional Air Mobility",
    ]
    const available = new Set()
    items.forEach((item) => {
      const raw = item.fields.Suitability
      if (typeof raw === "string") {
        const norm = raw.toLowerCase().trim()
        if (norm === "urban air mobility") available.add("Urban Air Mobility")
        else if (norm === "suburban air mobility")
          available.add("Suburban Air Mobility")
        else if (norm === "regional air mobility")
          available.add("Regional Air Mobility")
      }
    })
    return ["All", ...orderedOptions.filter((opt) => available.has(opt))]
  }, [items])

  const [suitabilityFilter, setSuitabilityFilter] = useState(
    "Suburban Air Mobility"
  )
  const [xAttribute, setXAttribute] = useState("")
  const [yAttribute, setYAttribute] = useState("")
  const [graphType, setGraphType] = useState("")

  const filteredItems = useMemo(() => {
    if (suitabilityFilter === "All") return items
    return items.filter((item) => {
      const raw = item.fields.Suitability
      if (typeof raw !== "string") return false
      const norm = raw.toLowerCase().trim()
      return (
        (suitabilityFilter === "Urban Air Mobility" &&
          norm === "urban air mobility") ||
        (suitabilityFilter === "Suburban Air Mobility" &&
          norm === "suburban air mobility") ||
        (suitabilityFilter === "Regional Air Mobility" &&
          norm === "regional air mobility")
      )
    })
  }, [items, suitabilityFilter])

  const allAttributes = useMemo(() => {
    const attrs = new Set()
    filteredItems.forEach((item) => {
      Object.keys(item.fields).forEach((key) => {
        if (key !== titleField && key.toLowerCase() !== "image") {
          attrs.add(key)
        }
      })
    })
    return Array.from(attrs)
  }, [filteredItems, titleField])

  const numericAttributes = useMemo(() => {
    const pattern = /^[\d,.]+\s*(km|km\/h|%|m|ft)?$/i
    return allAttributes
      .filter((attr) =>
        filteredItems.some((item) => {
          const v = item.fields[attr]
          if (typeof v === "number") return true
          if (typeof v === "string") return pattern.test(v.trim())
          return false
        })
      )
      .filter(
        (attr) =>
          attr !== "Range" &&
          attr !== "Top Speed" &&
          attr !== "Year of Certification"
      )
  }, [allAttributes, filteredItems])

  const graphTypesSingle = useMemo(
    () => ["Radar", "Bar", "Doughnut", "Polar Area"],
    []
  )
  const graphTypesDouble = useMemo(() => ["Bar"], [])

  useEffect(() => {
    if (!xAttribute && numericAttributes.length) {
      setXAttribute(numericAttributes[0])
    }
  }, [numericAttributes, xAttribute])

  useEffect(() => {
    setGraphType(yAttribute ? graphTypesDouble[0] : graphTypesSingle[0])
  }, [yAttribute, graphTypesDouble, graphTypesSingle])

  const labels = filteredItems.map((item) => item.fields[titleField] || "")

  const extractData = (attr) =>
    filteredItems.map((item) => {
      const v = item.fields[attr]
      const n =
        typeof v === "number"
          ? v
          : typeof v === "string"
            ? parseFloat(v.replace(/[^0-9.]/g, ""))
            : NaN
      return isNaN(n) ? null : n
    })

  const xData = xAttribute ? extractData(xAttribute) : []
  const yData = yAttribute ? extractData(yAttribute) : []

  if (!filteredItems.length) {
    return (
      <div className="py-8 text-center">No items match {suitabilityFilter}</div>
    )
  }

  const availableGraphTypes = yAttribute ? graphTypesDouble : graphTypesSingle

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 lg:w-screen lg:flex-row lg:justify-between">
        <div className="flex gap-4">
          <Dropdown
            attributes={numericAttributes}
            selectedValue={xAttribute}
            onChange={(value) => {
              if (value === yAttribute) setYAttribute("")
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

        <div className="sm:mx-auto lg:self-end">
          <Dropdown
            attributes={suitabilityOptions}
            selectedValue={suitabilityFilter}
            onChange={setSuitabilityFilter}
          />
        </div>
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
