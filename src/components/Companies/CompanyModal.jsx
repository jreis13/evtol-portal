"use client"

import { faCalendarAlt, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import CompanyFinancials from "./CompanyFinancials"

export default function CompanyModal({
  isOpen,
  onClose,
  company,
  mainStatsFields = [],
}) {
  const fields = company?.fields || null

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

            <div className="flex align-center items-center mb-6 gap-4">
              {fields.Logo && (
                <Image
                  src={fields.Logo}
                  alt={fields["Company Name"] || fields.Name}
                  width={1000}
                  height={1000}
                  className="object-contain w-20 h-20"
                />
              )}

              <h2 className="text-2xl font-semibold mb-2 text-[#f5f5f5]">
                {fields["Company Name"] || fields.Name}
              </h2>
            </div>

            <div className="flex flex-col">
              {fields["Company Summary"] || fields["Description "] ? (
                <p className="text-[#ddd] mb-4">
                  {fields["Company Summary"] || fields["Description "]}
                </p>
              ) : null}

              {fields["Last Update"] && (
                <div className="text-sm text-[#ccc] mb-6">
                  Last Update:{" "}
                  <span className="font-medium">{fields["Last Update"]}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {mainStatsFields.map((field) => (
                  <div
                    key={field}
                    className="bg-[#2f2f38] rounded-lg p-4 text-sm"
                  >
                    <p className="text-[#ddd] text-md">
                      {field.replace(/\s?\(.*?\)/, "")}
                    </p>
                    <p className="text-[#bbb] text-lg">
                      {fields[field] || "—"}
                    </p>
                  </div>
                ))}
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
                              className="flex items-start space-x-4"
                            >
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="text-[#d87103] text-lg mt-1"
                              />
                              <div>
                                <p className="font-semibold text-[#ddd]">
                                  {label}
                                </p>
                                <p className="text-[#bbb]">{description}</p>
                              </div>
                            </li>
                          )
                        })}
                    </ul>
                  </div>
                </div>
              )}

              {Array.isArray(fields["Founding Team"]) && (
                <div className="flex flex-col py-4 lg:pt-8">
                  <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">
                    Founding Team
                  </h3>
                  <div
                    className={`w-full bg-[#2f2e38] rounded-lg p-4 lg:p-6 shadow-md grid gap-4 ${
                      fields["Founding Team"].length === 1
                        ? "grid-cols-1"
                        : fields["Founding Team"].length === 3
                          ? "grid-cols-3"
                          : "grid-cols-2"
                    }`}
                  >
                    {fields["Founding Team"].map((entry, index) => (
                      <p
                        key={index}
                        className="text-[#ddd] text-lg text-center"
                      >
                        {entry.split(" - ")[0]} <br />{" "}
                        <span className="text-md text-[#bbb]">
                          {entry.split(" - ")[1]}
                        </span>
                        <br />
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {fields["Financials"] && (
                <CompanyFinancials recordIds={fields["Financials"]} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
