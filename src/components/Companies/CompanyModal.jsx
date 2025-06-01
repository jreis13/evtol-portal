"use client"

import { faCalendarAlt, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import icons from "../../common/icons"
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

            <div className="mb-6 flex place-items-center gap-4">
              {fields.Logo && (
                <Image
                  src={fields.Logo}
                  alt={fields["Company Name"] || fields.Name}
                  width={1000}
                  height={1000}
                  className="size-20 object-contain"
                />
              )}

              <h2 className="mb-2 text-2xl font-semibold text-[#f5f5f5]">
                {fields["Company Name"] || fields.Name}
              </h2>
            </div>

            <div className="flex flex-col">
              {fields["Company Summary"] || fields["Description "] ? (
                <p className="mb-4 text-[#ddd]">
                  {fields["Company Summary"] || fields["Description "]}
                </p>
              ) : null}

              {fields["Last Update"] && (
                <div className="mb-6 text-sm text-[#ccc]">
                  Last Update:{" "}
                  <span className="font-medium">{fields["Last Update"]}</span>
                </div>
              )}

              <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mainStatsFields.map((field) => (
                  <div
                    key={field}
                    className="rounded-lg bg-[#2f2f38] p-4 text-sm"
                  >
                    <p className="text-base text-[#ddd]">
                      {field.replace(/\s?\(.*?\)/, "")}
                    </p>
                    <p className="text-lg text-[#bbb]">
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
                              className="flex items-start space-x-4"
                            >
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="mt-1 text-lg text-[#d87103]"
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
                    className={`grid w-full gap-4 rounded-lg bg-[#2f2e38] p-4 shadow-md lg:p-6 ${
                      fields["Founding Team"].length === 1
                        ? "grid-cols-1"
                        : fields["Founding Team"].length === 3
                          ? "grid-cols-3"
                          : "grid-cols-2"
                    }`}
                  >
                    {fields["Founding Team"].map((entry, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <Image
                          key={index}
                          src={icons["personIcon"]}
                          alt={entry.split(" - ")[0]}
                          width={1000}
                          height={1000}
                          className="mx-auto size-16 rounded-full object-contain"
                        />
                        <p
                          key={index}
                          className="text-center text-lg text-[#ddd]"
                        >
                          {entry.split(" - ")[0]} <br />{" "}
                          <span className="text-base text-[#bbb]">
                            {entry.split(" - ")[1]}
                          </span>
                          <br />
                        </p>
                      </div>
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
