"use client"

import { faCalendarAlt, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 lg:px-0"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="scrollbar-thin relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-y-auto rounded-lg bg-[#34333d] p-6 pr-4 text-[#f5f5f5] shadow-lg"
          >
            <button
              onClick={onClose}
              className="sticky top-0 z-10 ml-auto text-3xl font-semibold text-[#d87103]"
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="text-[#d87103] transition-all duration-200 hover:text-[#f5f5f5]"
                size="sm"
              />
            </button>
            <div className="flex flex-col items-center gap-10 lg:flex-row">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <h2 className="mb-2 text-3xl font-semibold text-[#f5f5f5]">
                    {fields.Name}
                  </h2>
                  {fields["Description "] && (
                    <p className="text-lg leading-relaxed text-[#ddd]">
                      {fields["Description "]}
                    </p>
                  )}
                </div>

                {fields["Latest Developments"] && (
                  <div className="flex flex-col py-4 lg:pt-8">
                    <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">
                      Latest Developments
                    </h3>
                    <div className="w-full rounded-lg bg-[#2f2e38] p-4 shadow-md lg:p-6">
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
                                  className="mt-1 text-lg text-[#d87103]"
                                />
                                <div>
                                  <p className="text-base font-semibold text-[#ddd]">
                                    {label}
                                  </p>
                                  <p className="text-base text-[#bbb]">
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

                <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                  {fieldsToDisplay.map((field) => (
                    <React.Fragment key={field}>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-[#f5f5f5]">
                          {field.replace(/\s?\(.*?\)/, "")}:
                        </p>
                        <p className="text-base text-[#ccc]">
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
