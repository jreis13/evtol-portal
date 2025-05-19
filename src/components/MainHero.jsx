"use client"

import Image from "next/image"

export default function MainHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center text-[#34333d] px-6 py-14 lg:py-20 lg:px-20">
      <div className="max-w-7xl mx-auto mb-20 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <h1 className="text-5xl lg:text-7xl font-semibold leading-tight mb-2 lg:mb-8">
            Welcome to <br />
            the future <br />
            of air travel
          </h1>
          <p className="text-lg text-gray-600 mb-2 lg:mb-10">
            Discover the latest in electric vertical takeoff and landing
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#d87103] text-[#f5f5f5] px-6 py-3 rounded-md font-medium hover:text-[#403f4c] transition duration-300">
              Join now
            </button>
            <button className="bg-[#403f4c] text-[#d87103] px-6 py-3 rounded-md font-medium hover:bg-[#403f4c] hover:text-[#f5f5f5] transition duration-300">
              Find out more
            </button>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ clipPath: "inset(0 0.9% 0 0.9%)" }}
            className="rounded-xl lg:w-full object-cover"
          >
            <source src="/gif.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="lg:hidden w-full flex justify-center ">
          <Image
            src="/hero.png"
            alt="Main Hero"
            width={200}
            height={200}
            className="rounded-xl object-cover w-full"
          />
        </div>
      </div>
    </section>
  )
}
