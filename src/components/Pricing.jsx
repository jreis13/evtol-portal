"use client"

export default function Pricing() {
  return (
    <section className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold mb-12 text-[#403f4c]">
          Choose your plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#d87103]">
          <div className="bg-[#1b1b1b] rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-medium mb-4 text-[#d87103]">
                Free Access
              </h3>
              <p className="text-gray-300 mb-8">
                Access two curated data tables at no cost.
                <br /> Perfect for getting started.
              </p>
              <div className="text-4xl font-bold mb-1">$0</div>
              <div className="text-sm text-gray-400 mb-6">Per user / month</div>
            </div>
            <button className="bg-[#d87103] text-black px-5 py-3 rounded-md font-medium hover:text-[#f5f5f5] transition duration-300 w-full">
              Try free
            </button>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-medium mb-4 text-[#d87103]">
                Pro Access
              </h3>
              <p className="text-gray-300 mb-8">
                Unlock full access to all 3 tables, including premium private
                market data.
              </p>
              <div className="text-4xl font-bold mb-1">$9</div>
              <div className="text-sm text-gray-400 mb-6">Per user / month</div>
            </div>
            <button className="bg-[#d87103] text-black px-5 py-3 rounded-md font-medium hover:text-[#f5f5f5] transition duration-300 w-full">
              Upgrade now
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-medium mb-6">Key features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-gray-700 pt-6 justify-items-center">
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
