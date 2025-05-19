"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { IconButton, Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import Link from "../Link"
import Logo from "../Logo"

const PATHS = [
  { name: "Pricing", path: "#pricing" },
  { name: "Tables", path: "#tables" },
  { name: "About", path: "#about" },
  { name: "Contact", path: "#contact" },
]

export default function Header() {
  const { user } = useUser()
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

  const authPaths = user
    ? [
        ...PATHS.filter((path) => path.name !== "Login / Sign up"),
        { name: "Logout", path: "/api/auth/logout" },
      ]
    : [
        ...PATHS.filter(
          (path) => path.name !== "Login / Sign up" && path.name !== "Profile"
        ),
        { name: "Login / Sign up", path: "/api/auth/login" },
      ]

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
          <div className="flex items-end gap-2">
            <Logo />
            <p className="text-xs text-[#d87103]">by Exponential Vector ©</p>
          </div>

          <ul className="hidden lg:flex items-center gap-6">
            {authPaths.map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className="hover:text-gray-400 transition duration-300"
                >
                  {name}
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
            {authPaths.map(({ name, path }) => (
              <li key={name}>
                <Link to={path} className="transition duration-300 block">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Navbar>
    </div>
  )
}
