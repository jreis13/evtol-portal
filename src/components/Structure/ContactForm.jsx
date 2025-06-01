"use client"

import { useState } from "react"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("Sending...")

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus("Message sent!")
      setForm({ name: "", email: "", message: "" })
    } else {
      setStatus("Failed to send message.")
    }
  }

  return (
    <div className="mx-auto mb-20 max-w-7xl px-4 lg:px-0">
      <h2 className="mb-6 text-4xl font-semibold text-[#403f4c]">Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-2 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border p-2 focus:outline-none"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded bg-[#d87103] px-4 py-2 text-[#f5f5f5] transition duration-300 hover:text-[#403f4c]"
        >
          Send
        </button>
        <p className="mt-2 text-sm">{status}</p>
      </form>
    </div>
  )
}
