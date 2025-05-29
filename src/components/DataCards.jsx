import {
  faArrowAltCircleLeft,
  faArrowCircleLeft,
  faArrowCircleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import CompanyCard from "./Companies/CompanyCard"
import CompanyModal from "./Companies/CompanyModal"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"

export default function DataCards({
  title,
  items,
  config,
  modalFields = [],
  mainStatsFields = [],
}) {
  const isCompanySection =
    title === "Manufacturers" || title === "Trending Manufacturers"
  const isModelSection = title === "Aircrafts" || title === "Trending Aircrafts"

  const [filters, setFilters] = useState({
    marketShare: "",
    amountRaised: "",
    employees: "",
  })
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }))
  }
  const clearFilters = () => {
    setFilters({ marketShare: "", amountRaised: "", employees: "" })
  }

  const [prodFilters, setProdFilters] = useState({
    range: "",
    speed: "",
    passengers: "",
    unit: "",
  })
  const handleProdFilterChange = (type, value) => {
    setProdFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }))
  }
  const clearProdFilters = () => {
    setProdFilters({ range: "", speed: "", passengers: "", unit: "" })
  }

  const employeesOptions = ["11-50", "51-200", "201-499", "500-999", "+1000"]

  const makeBuckets = (field) => {
    const vals = items
      .map((it) => {
        let raw = it.fields[field] ?? 0
        if (field === "Amount Raised") {
          raw = String(raw).replace(/[$,]/g, "")
        }
        const num = Number(raw)
        return isNaN(num) ? 0 : num
      })
      .sort((a, b) => a - b)
    if (!vals.length) return []
    const min = vals[0]
    const max = vals[vals.length - 1]
    const step = Math.ceil((max - min) / 5) || 1
    const buckets = []
    for (let start = min; start <= max; start += step) {
      buckets.push({
        label: `${start} - ${start + step}`,
        min: start,
        max: start + step,
      })
    }
    return buckets
  }

  const marketShareBuckets = useMemo(
    () => makeBuckets("Market Share (%)"),
    [items]
  )
  const amountRaisedBuckets = [
    { label: "$1 – $10 M", min: 1, max: 10_000_000 },
    { label: "$10 M – $100 M", min: 10_000_000, max: 100_000_000 },
    { label: "$100 M – $1 B", min: 100_000_000, max: 1_000_000_000 },
    { label: "> $1 B", min: 1_000_000_000, max: Infinity },
  ]
  const rangeBuckets = useMemo(() => makeBuckets("Range (KM)"), [items])
  const speedBuckets = useMemo(() => makeBuckets("Top Speed (KM/h)"), [items])
  const passengerBuckets = useMemo(
    () => makeBuckets("Passenger Capacity"),
    [items]
  )
  const unitOptions = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.fields["Unit"]))).filter(
        (v) => v != null
      ),
    [items]
  )

  const filteredItems = useMemo(() => {
    let list = items
    if (isCompanySection) {
      list = list.filter((it) => {
        let rawMS = it.fields["Market Share (%)"] ?? ""
        rawMS = String(rawMS).replace(/[%]/g, "")
        const ms = Number(rawMS) || 0
        let rawAR = it.fields["Amount Raised"] ?? ""
        rawAR = String(rawAR).replace(/[$,]/g, "")
        const ar = Number(rawAR) || 0
        const emp = String(it.fields["# of Employees"] ?? "")
        if (filters.marketShare) {
          const b = marketShareBuckets.find(
            (x) => x.label === filters.marketShare
          )
          if (!b || ms < b.min || ms >= b.max) return false
        }
        if (filters.amountRaised) {
          const b = amountRaisedBuckets.find(
            (x) => x.label === filters.amountRaised
          )
          if (!b || ar < b.min || ar >= b.max) return false
        }
        if (filters.employees && emp !== filters.employees) return false
        return true
      })
    } else if (isModelSection) {
      list = list.filter((it) => {
        const r = Number(it.fields["Range (KM)"]) || 0
        const s = Number(it.fields["Top Speed (KM/h)"]) || 0
        const p = Number(it.fields["Passenger Capacity"]) || 0
        const u = it.fields["Unit"] ?? ""
        if (prodFilters.range) {
          const b = rangeBuckets.find((b) => b.label === prodFilters.range)
          if (!b || r < b.min || r >= b.max) return false
        }
        if (prodFilters.speed) {
          const b = speedBuckets.find((b) => b.label === prodFilters.speed)
          if (!b || s < b.min || s >= b.max) return false
        }
        if (prodFilters.passengers) {
          const b = passengerBuckets.find(
            (b) => b.label === prodFilters.passengers
          )
          if (!b || p < b.min || p >= b.max) return false
        }
        if (prodFilters.unit && u !== prodFilters.unit) return false
        return true
      })
    }
    return list
  }, [
    items,
    isCompanySection,
    isModelSection,
    filters,
    prodFilters,
    marketShareBuckets,
    amountRaisedBuckets,
    rangeBuckets,
    speedBuckets,
    passengerBuckets,
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null)
  const total = filteredItems.length

  useEffect(() => {
    const updateVisibleCount = () =>
      setVisibleCount(window.innerWidth >= 1024 ? 3 : 1)
    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const handlePrev = () => setCurrentIndex((p) => Math.max(p - visibleCount, 0))
  const handleNext = () =>
    setCurrentIndex((p) => Math.min(p + visibleCount, total - visibleCount))

  const visibleItems = filteredItems.slice(
    currentIndex,
    currentIndex + visibleCount
  )

  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  return (
    <div className="max-w-7xl mx-auto mb-20 relative">
      <h2 className="text-4xl font-semibold mb-6 text-[#403f4c]">{title}</h2>

      {isCompanySection && (
        <motion.div className="relative flex justify-center sm:justify-end mb-4 px-4 sm:px-0">
          {!isFilterExpanded ? (
            <motion.button
              onClick={() => setIsFilterExpanded(true)}
              className="bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                Filters
              </div>
            </motion.button>
          ) : (
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center w-full justify-between">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                  <h3>Market Share:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("marketShare", e.target.value)
                    }
                    value={filters.marketShare}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {marketShareBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label}
                      </option>
                    ))}
                  </motion.select>
                </div> */}
                <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                  <h3>Amount Raised:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("amountRaised", e.target.value)
                    }
                    value={filters.amountRaised}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {amountRaisedBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                  <h3>Employees:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("employees", e.target.value)
                    }
                    value={filters.employees}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {employeesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={clearFilters}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                >
                  Clear
                </motion.button>
                <motion.button
                  onClick={() => setIsFilterExpanded(false)}
                  className="text-[#403f4c] focus:outline-none h-fit"
                  whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {isModelSection && (
        <motion.div className="relative flex justify-center sm:justify-end mb-4 px-4 sm:px-0">
          {!isFilterExpanded ? (
            <motion.button
              onClick={() => setIsFilterExpanded(true)}
              className="bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowCircleLeft} />
                Filters
              </div>
            </motion.button>
          ) : (
            <motion.div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center w-full justify-between">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                  <h3>Range:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("range", e.target.value)
                    }
                    value={prodFilters.range}
                    className="w-1/2 sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {rangeBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label} KM
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex gap-4 items-center">
                  <h3>Speed:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("speed", e.target.value)
                    }
                    value={prodFilters.speed}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {speedBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label} KM/h
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex gap-4 items-center">
                  <h3>Passengers:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("passengers", e.target.value)
                    }
                    value={prodFilters.passengers}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {passengerBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex gap-4 items-center">
                  <h3>Unit:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("unit", e.target.value)
                    }
                    value={prodFilters.unit}
                    className="w-full sm:w-auto max-w-xs bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  >
                    <option value="">All</option>
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </motion.select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={clearProdFilters}
                  className="appearance-none cursor-pointer bg-[#34333d] text-[#e8e8e8] rounded-lg px-4 py-2 focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                >
                  Clear
                </motion.button>
                <motion.button
                  onClick={() => setIsFilterExpanded(false)}
                  className="text-[#403f4c] focus:outline-none h-fit"
                  whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-0 top-1/2 transform -translate-y-1/2 z-10 text-3xl py-2"
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </button>
        )}
        <div className="max-w-7xl mx-auto flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                currentIndex +
                JSON.stringify(filters) +
                JSON.stringify(prodFilters)
              }
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch px-4"
            >
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 lg:w-[400px] cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {isCompanySection ? (
                    <CompanyCard
                      item={item}
                      onClick={setSelectedItem}
                      config={config}
                    />
                  ) : (
                    <ProductCard
                      item={item}
                      onClick={setSelectedItem}
                      config={config}
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {currentIndex + visibleCount < total && (
          <button
            onClick={handleNext}
            className="absolute -right-0 top-1/2 transform -translate-y-1/2 z-10 text-3xl py-2"
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        )}
      </div>

      {isCompanySection && (
        <CompanyModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          company={selectedItem}
          mainStatsFields={mainStatsFields}
        />
      )}
      {isModelSection && (
        <ProductModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          model={selectedItem}
          fieldsToDisplay={modalFields}
        />
      )}
    </div>
  )
}
