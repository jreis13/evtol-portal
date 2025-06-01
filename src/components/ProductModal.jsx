"use client"

import { faCalendarAlt, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import React, { useEffect } from "react"

export default function ProductModal({
  isOpen,
  onClose,
  model,
  fieldsToDisplay = [],
}) {
  const fields = model?.fields || null

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && fields && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 lg:px-0"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#34333d] text-[#f5f5f5] rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto pr-4 p-6 relative scrollbar-thin flex flex-col"
          >
            <button
              onClick={onClose}
              className="sticky top-0 ml-auto z-10 text-[#d87103] text-3xl font-semibold"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#d87103] hover:text-[#f5f5f5] transition-all duration-200"
                size="sm"
              />
            </button>
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <div className="flex-shrink-0 w-full lg:w-1/2">
                <Image
                  src={fields["Product Image"] || "/portal.png"}
                  alt={fields.Name}
                  width={1000}
                  height={1000}
                  className="rounded object-contain w-full h-auto"
                />
              </div>

              <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <div>
                  <h2 className="text-3xl font-semibold mb-2 text-[#f5f5f5]">
                    {fields.Name}
                  </h2>
                  {fields["Description "] && (
                    <p className="text-[#ddd] leading-relaxed text-lg">
                      {fields["Description "]}
                    </p>
                  )}
                </div>

                {fields["Latest Developments"] && (
                  <div className="flex flex-col py-4 lg:pt-8">
                    <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">
                      Latest Developments
                    </h3>
                    <div className="w-full bg-[#2f2e38] rounded-lg p-4 lg:p-6 shadow-md">
                      <ul className="space-y-4">
                        {fields["Latest Developments"]
                          .split(";")
                          .map((entry, index) => {
                            const trimmedEntry = entry.trim()
                            const [label, description] = trimmedEntry
                              .split(" - ")
                              .map((s) => s.trim())

                            return (
                              <li
                                key={index}
                                className="flex items-start space-x-4 text-base"
                              >
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="text-[#d87103] text-lg mt-1"
                                />
                                <div>
                                  <p className="font-semibold text-[#ddd] text-base">
                                    {label}
                                  </p>
                                  <p className="text-[#bbb] text-base">
                                    {description}
                                  </p>
                                </div>
                              </li>
                            )
                          })}
                      </ul>
                    </div>
                  </div>
                )}

                <hr className="border-gray-600" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  {fieldsToDisplay.map((field) => (
                    <React.Fragment key={field}>
                      <div>
                        <p className="text-sm font-semibold text-[#f5f5f5] mb-1">
                          {field.replace(/\s?\(.*?\)/, "")}:
                        </p>
                        <p className="text-[#ccc] text-base">
                          {fields[field] || "—"}
                        </p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
