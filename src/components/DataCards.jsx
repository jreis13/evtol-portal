import {
  faArrowAltCircleLeft,
  faArrowCircleLeft,
  faArrowCircleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
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
    country: "",
    employees: "",
    region: "",
    fundingRound: "",
    yearFounded: "",
  })
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }))
  }
  const clearFilters = () => {
    setFilters({
      marketShare: "",
      country: "",
      employees: "",
      region: "",
      fundingRound: "",
      yearFounded: "",
    })
  }

  const [prodFilters, setProdFilters] = useState({
    range: "",
    speed: "",
    passengers: "",
    suitability: "",
    yearOfCertification: "",
  })

  const handleProdFilterChange = (type, value) => {
    setProdFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }))
  }

  const clearProdFilters = () => {
    setProdFilters({
      range: "",
      speed: "",
      passengers: "",
      suitability: "",
      yearOfCertification: "",
    })
  }

  const [searchTerm, setSearchTerm] = useState("")

  const countryOptions = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.fields["Country"])))
        .sort()
        .filter((v) => v != null),
    [items]
  )

  const regionOptions = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.fields["Region"])))
        .sort()
        .filter((v) => v != null),
    [items]
  )

  const employeesOptions = ["11-50", "51-200", "201-499", "500-999", "+1000"]

  const fundingRoundOptions = useMemo(() => {
    return Array.from(
      new Set(
        items
          .map((it) =>
            String(it.fields["Funding Round (from Funding Stage)"] || "").trim()
          )
          .filter((v) => v !== "")
      )
    ).sort()
  }, [items])

  const yearFoundedOptions = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.fields["Year Founded"])))
        .sort()
        .filter((v) => v != null),
    [items]
  )

  const makeBuckets = useCallback(
    (field) => {
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
    },
    [items]
  )

  const marketShareBuckets = useMemo(
    () => makeBuckets("Market Share (%)"),
    [makeBuckets]
  )
  const rangeBuckets = useMemo(() => makeBuckets("Range (KM)"), [makeBuckets])
  const speedBuckets = useMemo(
    () => makeBuckets("Top Speed (KM/h)"),
    [makeBuckets]
  )
  const passengerBuckets = useMemo(
    () => makeBuckets("Passenger Capacity"),
    [makeBuckets]
  )

  const suitabilityOptions = [
    "Urban Air Mobility",
    "Suburban Air Mobility",
    "Regional Air Mobility",
  ]

  const yearOfCertificationOptions = useMemo(
    () =>
      Array.from(new Set(items.map((it) => it.fields["Year of Certification"])))
        .sort()
        .filter((v) => v != null),
    [items]
  )

  const filteredItems = useMemo(() => {
    let list = items
    if (isCompanySection) {
      list = list.filter((it) => {
        let rawMS = it.fields["Market Share (%)"] ?? ""
        rawMS = String(rawMS).replace(/[%]/g, "")
        const ms = Number(rawMS) || 0
        const cou = String(it.fields["Country"] ?? "")
        const reg = String(it.fields["Region"] ?? "")
        const emp = String(it.fields["# of Employees"] ?? "")
        const fur = String(
          it.fields["Funding Round (from Funding Stage)"] ?? ""
        )
        const yea = String(it.fields["Year Founded"] ?? "")

        if (filters.marketShare) {
          const b = marketShareBuckets.find(
            (x) => x.label === filters.marketShare
          )
          if (!b || ms < b.min || ms >= b.max) return false
        }
        if (filters.country && cou !== filters.country) return false
        if (filters.region && reg !== filters.region) return false
        if (filters.employees && emp !== filters.employees) return false
        if (filters.fundingRound && fur !== filters.fundingRound) return false
        if (filters.yearFounded && yea !== filters.yearFounded) return false

        return true
      })
    } else if (isModelSection) {
      list = list.filter((it) => {
        const ran = Number(it.fields["Range (KM)"]) || 0
        const spe = Number(it.fields["Top Speed (KM/h)"]) || 0
        const pas = Number(it.fields["Passenger Capacity"]) || 0
        const sui = it.fields["Suitability"] ?? ""
        const yea = it.fields["Year of Certification"] ?? ""

        if (prodFilters.range) {
          const b = rangeBuckets.find((b) => b.label === prodFilters.range)
          if (!b || ran < b.min || ran >= b.max) return false
        }
        if (prodFilters.speed) {
          const b = speedBuckets.find((b) => b.label === prodFilters.speed)
          if (!b || spe < b.min || spe >= b.max) return false
        }
        if (prodFilters.passengers) {
          const b = passengerBuckets.find(
            (b) => b.label === prodFilters.passengers
          )
          if (!b || pas < b.min || pas >= b.max) return false
        }
        if (prodFilters.suitability && sui !== prodFilters.suitability)
          return false
        if (
          prodFilters.yearOfCertification &&
          yea !== prodFilters.yearOfCertification
        )
          return false

        return true
      })
    }
    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase()
      list = list.filter((it) => {
        const name = it.fields["Name"] || it.fields["Company Name"] || ""
        return name.toLowerCase().includes(lower)
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
    rangeBuckets,
    speedBuckets,
    passengerBuckets,
    searchTerm,
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
    <div className="relative mx-auto mb-20 max-w-7xl">
      <h2 className="mb-6 text-4xl font-semibold text-[#403f4c]">{title}</h2>

      {isCompanySection && (
        <motion.div className="relative mb-4 flex justify-center px-4 sm:justify-end sm:px-0">
          {!isFilterExpanded ? (
            <motion.button
              onClick={() => setIsFilterExpanded(true)}
              className="rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                Filters
              </div>
            </motion.button>
          ) : (
            <motion.div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Country:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("country", e.target.value)
                    }
                    value={filters.country}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {countryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Region:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("region", e.target.value)
                    }
                    value={filters.region}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {regionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Employees:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("employees", e.target.value)
                    }
                    value={filters.employees}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {employeesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Funding Round:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("fundingRound", e.target.value)
                    }
                    value={filters.fundingRound}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {fundingRoundOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Year Founded:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleFilterChange("yearFounded", e.target.value)
                    }
                    value={filters.yearFounded}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {yearFoundedOptions.map((opt) => (
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
                  className="cursor-pointer appearance-none rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                >
                  Clear
                </motion.button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
                />

                <motion.button
                  onClick={() => setIsFilterExpanded(false)}
                  className="h-fit text-[#403f4c] focus:outline-none"
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
        <motion.div className="relative mb-4 flex justify-center px-4 sm:justify-end sm:px-0">
          {!isFilterExpanded ? (
            <motion.button
              onClick={() => setIsFilterExpanded(true)}
              className="rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faArrowCircleLeft} />
                Filters
              </div>
            </motion.button>
          ) : (
            <motion.div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Range:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("range", e.target.value)
                    }
                    value={prodFilters.range}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {rangeBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label} KM
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Speed:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("speed", e.target.value)
                    }
                    value={prodFilters.speed}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {speedBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label} KM/h
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Passengers:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("passengers", e.target.value)
                    }
                    value={prodFilters.passengers}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {passengerBuckets.map((b) => (
                      <option key={b.label} value={b.label}>
                        {b.label}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Suitability:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange("suitability", e.target.value)
                    }
                    value={prodFilters.suitability}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {suitabilityOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </motion.select>
                </div>
                <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row">
                  <h3>Year of Certification:</h3>
                  <motion.select
                    whileHover={{ scale: 1.05 }}
                    onChange={(e) =>
                      handleProdFilterChange(
                        "yearOfCertification",
                        e.target.value
                      )
                    }
                    value={prodFilters.yearOfCertification}
                    className="w-full max-w-xs rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none sm:w-auto"
                  >
                    <option value="">All</option>
                    {yearOfCertificationOptions.map((u) => (
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
                  className="cursor-pointer appearance-none rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                >
                  Clear
                </motion.button>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg bg-[#34333d] px-4 py-2 text-[#e8e8e8] focus:outline-none"
                />

                <motion.button
                  onClick={() => setIsFilterExpanded(false)}
                  className="h-fit text-[#403f4c] focus:outline-none"
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
            className="absolute -left-0 top-1/2 z-10 -translate-y-1/2 py-2 text-3xl"
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </button>
        )}
        <div className="mx-auto flex max-w-7xl justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`view-${currentIndex}-${visibleItems.map((i) => i.id).join("-")}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 items-stretch gap-4 px-4 lg:grid-cols-3"
            >
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 cursor-pointer lg:w-[400px]"
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
            className="absolute -right-0 top-1/2 z-10 -translate-y-1/2 py-2 text-3xl"
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
