"use client"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import {
  BuildingOffice2Icon,
  ChartBarIcon,
  CubeIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/solid"
import { IconButton, Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import Link from "./Link"
import Logo from "./Logo"

const PATHS = [
  { name: "Home", path: "#", icon: HomeIcon },
  { name: "Manufacturers", path: "#manufacturers", icon: BuildingOffice2Icon },
  { name: "Aircrafts", path: "#aircrafts", icon: CubeIcon },
  { name: "Sales", path: "#sales", icon: ChartBarIcon },
  { name: "Contact", path: "#contact", icon: EnvelopeIcon },
]

export default function Header() {
  const [openNav, setOpenNav] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateMedia = () => {
      const isNowDesktop = window.innerWidth >= 960
      setIsDesktop(isNowDesktop)
      if (isNowDesktop) setOpenNav(false)
    }

    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="mb-16">
      <Navbar
        shadow={false}
        color="transparent"
        fullWidth
        className={`fixed top-0 left-0 w-full z-50 border-0 h-16 lg:h-20 flex items-center transition-colors duration-300 ${
          scrolled ? "bg-[#f5f5f5]" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <Logo />

          <ul className="hidden lg:flex items-center gap-4">
            {PATHS.map(({ name, path, icon: Icon }) => (
              <li key={name}>
                <Link to={path}>
                  <div className="flex items-center gap-2">
                    {name}
                    <Icon className="h-4 w-4" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <IconButton
            variant="text"
            onClick={() => setOpenNav(!openNav)}
            className="lg:hidden"
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6 text-[#34333d]" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-[#34333d]" />
            )}
          </IconButton>
        </div>

        <div
          className={`absolute top-full w-content right-0 bg-[#34333d] text-[#f5f5f5] mr-4 rounded transition-transform duration-300 ${
            openNav
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-4 p-6">
            {PATHS.map(({ name, path, icon: Icon }) => (
              <li key={name} className="text-[#f5f5f5]">
                <Link to={path}>
                  <div className="block flex items-center gap-2">
                    {name}
                    <Icon className="h-4 w-4" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Navbar>
    </div>
  )
}
