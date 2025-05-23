import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(1)
  const [selectedItem, setSelectedItem] = useState(null)

  const total = items.length

  const updateVisibleCount = () => {
    setVisibleCount(window.innerWidth >= 1024 ? 3 : 1)
  }

  useEffect(() => {
    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - visibleCount, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + visibleCount, total - visibleCount)
    )
  }

  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount)

  return (
    <div className="max-w-7xl mx-auto mb-20 relative">
      <h2 className="text-4xl font-semibold mb-10 text-[#403f4c]">{title}</h2>
      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 py-2 ml-8 lg:mr-4 text-3xl"
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </button>
        )}

        <div className="max-w-7xl mx-auto flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
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
                  {title === "Companies" ? (
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
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 py-2 mr-8 lg:ml-4 text-3xl"
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        )}
      </div>

      {title === "Companies" && (
        <CompanyModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          company={selectedItem}
          mainStatsFields={mainStatsFields}
        />
      )}

      {title === "Models" && (
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
