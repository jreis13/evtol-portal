"use client"

import Image from "next/image"
import NewsletterCTA from "../NewsletterCTA"

export default function MainHero() {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 py-14 text-[#34333d] lg:p-20">
      <div className="mx-auto mb-20 flex max-w-7xl flex-col-reverse items-end gap-8 lg:flex-row lg:gap-12">
        <div className="w-full lg:w-1/2">
          <h1 className="mb-2 text-5xl font-semibold leading-tight lg:mb-8 lg:text-7xl">
            Welcome to <br />
            the future <br />
            of air travel
          </h1>
          <p className="mb-2 text-lg text-gray-600 lg:mb-10">
            Tracking the latest developments in the eVTOL space.
          </p>
          <NewsletterCTA />
        </div>

        <div className="hidden justify-center lg:flex lg:w-1/2">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ clipPath: "inset(0 0.9% 0 0.9%)" }}
            className="rounded-xl object-cover lg:w-full"
          >
            <source src="/gif.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex w-full justify-center lg:hidden ">
          <Image
            src="/hero.png"
            alt="Main Hero"
            width={500}
            height={500}
            className="w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  )
}
