"use client"

import { IconButton, Typography } from "@material-tailwind/react"
import Image from "next/image"

const currentYear = new Date().getFullYear()

const socialPATHS = [
  {
    name: "X (Twitter)",
    path: "https://x.com/exp_vector",
    icon: "/icons/x.svg",
  },
  {
    name: "LinkedIn",
    path: "https://www.linkedin.com/company/exponential-vector/",
    icon: "/icons/linkedin.svg",
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#34333d] px-8 py-8 w-screen overflow-x-hidden">
      <div className="container mx-auto">
        <div className="grid  grid-cols-1 lg:flex gap-6 items-center">
          <div className="flex justify-center lg:justify-start">
            eVTOL Portal
          </div>

          <div className="flex justify-center">
            <Typography className="text-sm text-center">
              © {currentYear} eVTOL Portal S.R.O - All Rights Reserved.
            </Typography>
          </div>

          <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:justify-end gap-6">
            <a
              href="/files/Privacy_Policy_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a
              href="/files/Terms_and_Conditions_Exponential_Vector.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline whitespace-nowrap"
            >
              Terms & Conditions
            </a>
          </div>
          <div className="flex justify-center gap-3">
            {socialPATHS.map(({ name, path, icon }) => (
              <a
                key={name}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton variant="text" size="lg">
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className="opacity-100"
                  />
                </IconButton>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
