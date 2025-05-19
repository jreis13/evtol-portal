// components/ContactForm.jsx
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
    <div className="max-w-7xl mx-auto mb-20">
      <h2 className="text-4xl font-semibold mb-6 text-[#403f4c]">Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl"
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-xl"
        />
        <button
          type="submit"
          className="bg-[#d87103] text-white px-4 py-2 rounded hover:text-[#403f4c] transition duration-300"
        >
          Send
        </button>
        <p className="text-sm mt-2">{status}</p>
      </form>
    </div>
  )
}
