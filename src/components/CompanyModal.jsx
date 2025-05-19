"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import React from "react"

export default function CompanyModal({
  isOpen,
  onClose,
  company,
  fieldsToDisplay = [],
}) {
  const fields = company?.fields || null

  return (
    <AnimatePresence>
      {isOpen && fields && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#f5f5f5] text-[#34333d] rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-[#d87103] text-3xl font-bold"
            >
              &times;
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {fields.Logo && (
                <Image
                  src={fields.Logo}
                  alt={fields["Company Name"] || fields.Name}
                  width={80}
                  height={80}
                  className="rounded-md object-contain w-20 h-20"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {fields["Company Name"] || fields.Name}
                </h2>

                {fields["Company Summary"] || fields["Description "] ? (
                  <p className="text-[#555] mb-4">
                    {fields["Company Summary"] || fields["Description "]}
                  </p>
                ) : null}

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  {fieldsToDisplay.map((field) => (
                    <React.Fragment key={field}>
                      <span className="font-medium">
                        {field.replace(/\s?\(.*?\)/, "")}:
                      </span>
                      <span>{fields[field] || "—"}</span>
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
