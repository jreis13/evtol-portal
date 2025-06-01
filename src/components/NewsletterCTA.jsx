"use client"

import { Card, CardBody, Typography } from "@material-tailwind/react"
import { useState } from "react"
import Logo from "./Structure/Logo"

function NewsletterPopup({ onClose }) {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <Card onClick={(e) => e.stopPropagation()}>
        <CardBody className="w-full">
          <div className="flex justify-center">
            <i className="fa-solid fa-check text-3xl text-gray-600"></i>
          </div>
          <Logo />
          <Typography
            className="mb-6 mt-10 text-gray-600 text-center"
            variant="h4"
          >
            Successfully Subscribed!
          </Typography>
          <Typography className="text-gray-600 text-center text-lg leading-6">
            You have been added to our newsletter! <br /> Stay updated with the
            latest insights.
          </Typography>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#d87103] text-white rounded-lg"
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
    <section className="w-full flex flex-col items-center shadow-lg">
      <div className="flex flex-col rounded-lg p-8 bg-[#f5f5f5] w-full max-w-2xl gap-2">
        <h3 className="text-2xl font-semibold">
          Subscribe to Our eVTOL Newsletter
        </h3>
        <p className="text-gray-600 mt-4">
          Stay informed with the latest developments and insights.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg lg:w-[300px] border border-gray-600 px-4 py-2 focus:outline-none"
            required
          />
          <button
            type="submit"
            className={`px-6 py-3 bg-[#d87103] text-[#f5f5f5] hover:text-[#403f4c] text-lg font-semibold rounded-lg transition ${
              loading || !isChecked ? "bg-gray-500 cursor-not-allowed" : ""
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
