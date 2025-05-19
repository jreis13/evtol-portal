"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

export default function Logo() {
  const [isDesktop, setIsDesktop] = useState(false)

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 1024)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

  return (
    <>
      {isDesktop ? (
        <a href="/" className="group flex items-center font-semibold ">
          <Image
            alt="eVTOL Portal Logo"
            src="/portal.png"
            width={300}
            height={300}
            className="w-20 h-20"
          />

          <h2 className="text-4xl group-hover:text-[#d87103] duration-300">
            eVTOL Portal
          </h2>
        </a>
      ) : (
        <a href="/">
          <Image
            alt="eVTOL Portal Logo"
            src="/portal.png"
            width={300}
            height={300}
            className="object-contain w-20 h-20 p-2"
          />
        </a>
      )}
    </>
  )
}
