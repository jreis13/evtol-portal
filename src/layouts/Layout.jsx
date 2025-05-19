"use client"

import { useEffect, useState } from "react"
import ScrollReveal from "src/animations/ScrollReveal"
import DataCards from "src/components/DataCards"
import DataTable from "src/components/DataTable"
import MainHero from "src/components/MainHero"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"

export default function Layout() {
  const isProUser = true

  const [companies, setCompanies] = useState([])
  const [models, setModels] = useState([])

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then(setCompanies)
      .catch((err) => console.error("Error fetching companies:", err))
  }, [])

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then(setModels)
      .catch((err) => console.error("Error fetching models:", err))
  }, [])

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
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <Header />
      <div id="hero">
        <MainHero />
      </div>
      {/* <ScrollReveal>
        <div id="pricing">
          <Pricing />
        </div>
      </ScrollReveal> */}
      <div id="tables" className="container mx-auto px-4 lg:px-0">
        <div id="companies">
          <DataCards
            title="Companies"
            items={companies}
            config={{
              imageField: "Logo",
              titleField: "Company Name",
              descriptionField: "Company Summary",
              fields: [
                "HQ",
                "Year Founded",
                "Funding Round (from Funding Stage)",
              ],
            }}
            modalFields={[
              "Funding Round (from Funding Stage)",
              "Amount Raised (from Funding Amount)",
              "Products",
            ]}
          />
        </div>

        <div id="models">
          <DataCards
            title="Models"
            items={models}
            config={{
              imageField: "Logo",
              titleField: "Name",
              descriptionField: "Description ",
              fields: ["Type", "Unit", "Stage"],
            }}
            modalFields={[
              "Manufacturer",
              "Range",
              "Speed",
              "Capacity",
              "Powertrain",
            ]}
          />
        </div>

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
