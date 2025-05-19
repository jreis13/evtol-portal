"use client"

import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Card from "./Card"
import CompanyModal from "./CompanyModal"

export default function DataCards({ title, items, config, modalFields = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)

  const visibleCount = 3
  const total = items.length

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, total - visibleCount))
  }

  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount)

  return (
    <div className="py-12 relative">
      <h2 className="text-4xl font-semibold mb-10 text-[#403f4c]">{title}</h2>
      <div className="relative">
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 py-2 mr-4 text-3xl"
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </button>
        )}

        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-between gap-6"
            >
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[400px] cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <Card item={item} onClick={setSelectedItem} config={config} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentIndex + visibleCount < total && (
          <button
            onClick={handleNext}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 py-2 ml-4 text-3xl"
          >
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        )}
      </div>

      <CompanyModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        company={selectedItem}
        fieldsToDisplay={modalFields}
      />
    </div>
  )
}
