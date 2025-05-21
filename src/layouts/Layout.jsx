"use client"

import { useEffect, useState } from "react"
import ScrollReveal from "src/animations/ScrollReveal"
import DataCards from "src/components/DataCards"
import DataTable from "src/components/DataTable"
import ContactForm from "src/components/Structure/ContactForm"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"
import MainHero from "src/components/Structure/MainHero"

export default function Layout() {
  const [companies, setCompanies] = useState([])
  const [models, setModels] = useState([])
  const [sales, setSales] = useState([])

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

  useEffect(() => {
    fetch("/api/sales")
      .then((res) => res.json())
      .then(setSales)
      .catch((err) => console.error("Error fetching sales:", err))
  }, [])

  return (
    <div className="relative flex flex-col w-full overflow-x-hidden">
      <Header />
      <div id="hero">
        <MainHero />
      </div>

      <div className="container mx-auto px-4 lg:px-0">
        <div id="companies">
          <ScrollReveal>
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
              mainStatsFields={[
                "Text Amount",
                "Type",
                "Funding Round (from Funding Stage)",
                "# of Employees",
                "Year Founded",
                "HQ",
              ]}
            />
          </ScrollReveal>
        </div>

        <div id="models">
          <ScrollReveal>
            <DataCards
              title="Models"
              items={models}
              config={{
                imageField: "Image",
                titleField: "Name",
                descriptionField: "Description ",
                fields: ["Type", "Unit", "Stage"],
              }}
              modalFields={[
                "Unit",
                "Type",
                "Range (KM)",
                "Top Speed (KM/h)",
                "Total Capacity",
                "Passenger Capacity",
                "Suitability",
                "Stage",
              ]}
            />
          </ScrollReveal>
        </div>

        <div id="sales">
          <DataTable
            title="Sales"
            records={sales}
            visibleFields={[
              "Company",
              "Aircraft Model",
              "Type",
              "Number of Orders",
              "Buyer",
              "Order Date",
            ]}
          />
        </div>
      </div>
      <div id="contact">
        <ContactForm />
      </div>

      <Footer />
    </div>
  )
}
