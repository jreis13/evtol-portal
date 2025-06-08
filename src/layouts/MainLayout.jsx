"use client"

import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />

      <Footer />
    </div>
  )
}
