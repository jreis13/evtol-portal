"use client"

export default function Pricing() {
  return (
    <section className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-semibold text-[#403f4c]">
          Choose your plan
        </h2>

        <div className="grid grid-cols-1 gap-8 text-[#d87103] md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-xl bg-[#1b1b1b] p-8">
            <div>
              <h3 className="mb-4 text-2xl font-medium text-[#d87103]">
                Free Access
              </h3>
              <p className="mb-8 text-gray-300">
                Access two curated data tables at no cost.
                <br /> Perfect for getting started.
              </p>
              <div className="mb-1 text-4xl font-bold">$0</div>
              <div className="mb-6 text-sm text-gray-400">Per user / month</div>
            </div>
            <button className="w-full rounded-md bg-[#d87103] px-5 py-3 font-medium text-black transition duration-300 hover:text-[#f5f5f5]">
              Try free
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-xl bg-[#1b1b1b] p-8">
            <div>
              <h3 className="mb-4 text-2xl font-medium text-[#d87103]">
                Pro Access
              </h3>
              <p className="mb-8 text-gray-300">
                Unlock full access to all 3 tables, including premium private
                market data.
              </p>
              <div className="mb-1 text-4xl font-bold">$9</div>
              <div className="mb-6 text-sm text-gray-400">Per user / month</div>
            </div>
            <button className="w-full rounded-md bg-[#d87103] px-5 py-3 font-medium text-black transition duration-300 hover:text-[#f5f5f5]">
              Upgrade now
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="mb-6 text-xl font-medium">Key features</h4>
          <div className="grid grid-cols-1 justify-items-center gap-4 border-t border-gray-700 pt-6 text-sm sm:grid-cols-2 md:grid-cols-3">
            {" "}
            <div>Access to free startup + investor tables</div>
            <div>Premium table: private equity funding</div>
            <div>Simple and fast table filtering</div>
            <div>Mobile and desktop responsive layout</div>
            <div>Email support for Pro users</div>
            <div>Easy cancellation anytime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
