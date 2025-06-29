"use client"

import classNames from "classnames"
import { usePathname } from "next/navigation"
import Link from "../Link"

export default function NavLinks({ paths, isDesktop }) {
  const pathname = usePathname()

  const normalizedPathname = pathname?.replace(/\/$/, "").toLowerCase()

  return (
    <nav>
      <ul
        className={classNames("flex list-none", {
          "text-right": !isDesktop,
          "flex-col gap-3": !isDesktop,
          "h-8 flex-row items-center gap-7": isDesktop,
        })}
      >
        {paths &&
          paths
            .filter(({ path }) => {
              const normalizedPath = path.replace(/\/$/, "").toLowerCase()
              return normalizedPath !== normalizedPathname
            })
            .map(({ name, path, type, icon }) => (
              <li key={name} className="link cursor-pointer">
                {type === "image" && icon ? (
                  <a href={path} rel="noopener noreferrer">
                    {icon}
                  </a>
                ) : (
                  <Link to={path}>{name}</Link>
                )}
              </li>
            ))}
      </ul>
    </nav>
  )
}
