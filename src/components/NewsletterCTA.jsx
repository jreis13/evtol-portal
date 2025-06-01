"use client"

import { Card, CardBody } from "@material-tailwind/react"
import { useState } from "react"
import Logo from "./Structure/Logo"

function NewsletterPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Card onClick={(e) => e.stopPropagation()}>
        <CardBody className="w-full">
          <div className="flex justify-center">
            <i className="text-3xl text-gray-600"></i>
          </div>
          <Logo />
          <p className="mb-6 mt-10 text-center text-gray-600">
            Successfully Subscribed!
          </p>
          <p className="text-center text-lg leading-6 text-gray-600">
            You have been added to our newsletter! <br /> Stay updated with the
            latest insights.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="rounded-lg bg-[#d87103] px-6 py-2 text-white"
            >
              Close
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setEmail("")
        setPopupVisible(true)
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || "Something went wrong.")
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.")
    }

    setLoading(false)
  }

  return (
    <section className="flex w-full flex-col items-center shadow-lg">
      <div className="flex w-full max-w-2xl flex-col gap-2 rounded-lg bg-[#f5f5f5] p-8">
        <h3 className="text-2xl font-semibold">
          Subscribe to Our eVTOL Newsletter
        </h3>
        <p className="mt-4 text-gray-600">
          Stay informed with the latest developments and insights.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col items-center gap-4 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-gray-600 px-4 py-2 focus:outline-none lg:w-[300px]"
            required
          />
          <button
            type="submit"
            className={`rounded-lg bg-[#d87103] px-6 py-3 text-lg font-semibold text-[#f5f5f5] transition hover:text-[#403f4c] ${
              loading || !isChecked ? "cursor-not-allowed bg-gray-500" : ""
            }`}
            disabled={loading || !isChecked}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        <label className="flex items-center text-xs">
          <span className="text-gray-600">
            By checking the box you agree to receive emails from eVTOL Portal
          </span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="ml-2"
          />
        </label>
        {errorMessage && (
          <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
        )}
      </div>
      {popupVisible && (
        <NewsletterPopup onClose={() => setPopupVisible(false)} />
      )}
    </section>
  )
}
