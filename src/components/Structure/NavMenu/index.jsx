"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Collapse, IconButton, Navbar } from "@material-tailwind/react"
import { useEffect, useState } from "react"
import PATHS from "src/common/data/navigationData"
import Link from "../Link"
import Logo from "../Logo"

export default function NavMenu() {
  const { user } = useUser()
  const [openNav, setOpenNav] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const updateMedia = () => setIsDesktop(window.innerWidth >= 960)
    updateMedia()
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
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
    <Navbar
      shadow={false}
      color="transparent"
      fullWidth
      className="absolute top-0 left-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between py-3">
        <Logo />

        <ul className="hidden lg:flex items-center gap-6">
          {authPaths.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="text-[#34333d] hover:text-gray-400 transition duration-300"
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

      <Collapse open={openNav} className="lg:hidden bg-gray-800">
        <ul className="flex flex-col gap-4 p-4">
          {authPaths.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="text-[#34333d] hover:text-gray-400 transition duration-300 block"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </Navbar>
  )
}
