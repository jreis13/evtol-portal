"use client"

import ScrollReveal from "src/animations/ScrollReveal"
import DataTable from "src/components/DataTable"
import MainHero from "src/components/MainHero"
import Pricing from "src/components/Pricing"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function Layout() {
  const isProUser = true

  const companies = [
    {
      id: "rec001",
      fields: {
        "Company Name": "SkyLift Aerospace",
        Logo: "🛩️",
        "Company Summary":
          "Developing hybrid eVTOL aircraft for cargo and passengers.",
        Industry: "Aerospace",
        Type: "Private",
        "Funding Stage": "Series A",
        "Amount Raised": "$25M",
        "Funding Source": "Venture Capital",
        "Funding Rounds": 2,
        "# of Employees": 45,
        "Year Founded": 2019,
        HQ: "Berlin",
        Website: "https://skylift.io",
        Country: "Germany",
        Region: "Europe",
        "Country Image": "🇩🇪",
        "Founding Team": "Eva Lenz, Markus Hoff",
        Financials: "Projected $5M ARR",
        Products: "SkyCargo 1, SkyTaxi 2",
        Patents: "VTOL rotor-folding system",
        "Key Investors": "AeroCapital, FutureTech Ventures",
        "Customer Growth": "200% YoY",
        "Latest Developments": "Secured urban corridor test routes in Berlin.",
        "Last Update": "2025-04-15",
      },
    },
    {
      id: "rec002",
      fields: {
        "Company Name": "VoltAir Dynamics",
        Logo: "⚡",
        "Company Summary": "Electric propulsion leader in urban air mobility.",
        Industry: "Aviation",
        Type: "Public",
        "Funding Stage": "IPO",
        "Amount Raised": "$150M",
        "Funding Source": "Public offering",
        "Funding Rounds": 5,
        "# of Employees": 210,
        "Year Founded": 2016,
        HQ: "San Francisco",
        Website: "https://voltair.io",
        Country: "USA",
        Region: "North America",
        "Country Image": "🇺🇸",
        "Founding Team": "Jenna Ruiz, Kofi Baker",
        Financials: "Revenue $43M Q1",
        Products: "VoltX-1, VoltPod UrbanJet",
        Patents: "Noise-canceling fan arrays",
        "Key Investors": "Accel Aero, SoftFly",
        "Customer Growth": "600% since launch",
        "Latest Developments": "FAA certification pending for VoltX-1",
        "Last Update": "2025-05-01",
      },
    },
  ]

  const models = [
    {
      id: "rec003",
      fields: {
        Model: "SkyCargo 1",
        Manufacturer: "SkyLift Aerospace",
        Type: "Cargo",
        Range: "500 km",
        Speed: "250 km/h",
        Capacity: "1000 kg",
        Powertrain: "Hybrid Electric",
        Certification: "EASA Part 23",
        Suitability: "Urban and Suburban",
        FirstFlight: "2024-06-01",
        Status: "In Development",
      },
    },
    {
      id: "rec004",
      fields: {
        Model: "VoltX-1",
        Manufacturer: "VoltAir Dynamics",
        Type: "Passenger",
        Range: "300 km",
        Speed: "300 km/h",
        Capacity: "4 passengers",
        Powertrain: "All Electric",
        Certification: "FAA Part 135",
        Suitability: "Urban and Suburban",
        FirstFlight: "2025-03-15",
        Status: "In Production",
      },
    },
  ]

  const sales = [
    {
      id: "rec005",
      fields: {
        Model: "SkyCargo 1",
        Manufacturer: "SkyLift Aerospace",
        Sales: "$5M",
        Region: "Europe",
        Year: 2025,
        UnitsSold: 10,
        CustomerFeedback: "Excellent performance in urban logistics.",
      },
    },
    {
      id: "rec006",
      fields: {
        Model: "VoltX-1",
        Manufacturer: "VoltAir Dynamics",
        Sales: "$20M",
        Region: "North America",
        Year: 2025,
        UnitsSold: 50,
        CustomerFeedback: "High demand for urban air taxi services.",
      },
    },
  ]

  return (
    <div className="relative flex min-h-screen flex-col w-full overflow-x-hidden">
      <Header />
      <div id="hero">
        <MainHero />
      </div>
      <ScrollReveal>
        <div id="pricing">
          <Pricing />
        </div>
      </ScrollReveal>
      <div id="tables" className="container mx-auto px-4 lg:px-0">
        <ScrollReveal>
          <div id="companies">
            <DataTable
              title="Companies"
              records={companies}
              blurred={!isProUser}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="models">
            <DataTable title="Models" records={models} blurred={!isProUser} />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div id="sales">
            <DataTable title="Sales" records={sales} blurred={isProUser} />
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  )
}
