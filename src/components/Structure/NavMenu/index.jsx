"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Collapse, IconButton, Navbar } from "@material-tailwind/react"
import { useState } from "react"
import PATHS from "src/common/data/navigationData"
import Link from "../Link"
import Logo from "../Logo"

export default function NavMenu() {
  const { user } = useUser()
  const [openNav, setOpenNav] = useState(false)

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
      className="absolute left-0 top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between py-3">
        <Logo />

        <ul className="hidden items-center gap-4 lg:flex">
          {authPaths.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="text-[#34333d] transition duration-300 hover:text-gray-400"
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
            <XMarkIcon className="size-6 text-[#34333d]" />
          ) : (
            <Bars3Icon className="size-6 text-[#34333d]" />
          )}
        </IconButton>
      </div>

      <Collapse open={openNav} className="bg-gray-800 lg:hidden">
        <ul className="flex flex-col gap-4 p-4">
          {authPaths.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className="block text-[#34333d] transition duration-300 hover:text-gray-400"
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
