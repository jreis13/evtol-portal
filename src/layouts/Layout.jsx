"use client"

import { useEffect, useState } from "react"
import ScrollReveal from "src/animations/ScrollReveal"
import DataCards from "src/components/DataCards"
import DataTable from "src/components/DataTable"
import ProductComparison from "src/components/ProductComparison"
import ContactForm from "src/components/Structure/ContactForm"
import Footer from "src/components/Structure/Footer"
import Header from "src/components/Structure/Header"
import MainHero from "src/components/Structure/MainHero"

export default function Layout() {
  const [companies, setCompanies] = useState([])
  const [models, setModels] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetch("/api/companies", { cache: "no-store" })
      .then((res) => res.json())
      .then(setCompanies)
      .catch((err) => console.error("Error fetching companies:", err))
  }, [])

  useEffect(() => {
    fetch("/api/models", { cache: "no-store" })
      .then((res) => res.json())
      .then(setModels)
      .catch((err) => console.error("Error fetching models:", err))
  }, [])

  useEffect(() => {
    fetch("/api/sales", { cache: "no-store" })
      .then((res) => res.json())
      .then(setSales)
      .catch((err) => console.error("Error fetching sales:", err))
  }, [])

  const trendingCompanies = companies.filter(
    (c) => Array.isArray(c.fields.Trending) && c.fields.Trending.includes("Yes")
  )
  const trendingModels = models.filter(
    (m) => Array.isArray(m.fields.Trending) && m.fields.Trending.includes("Yes")
  )

  const companiesWithoutTrending = companies.filter(
    (c) =>
      !Array.isArray(c.fields.Trending) || !c.fields.Trending.includes("Yes")
  )
  const modelsWithoutTrending = models.filter(
    (m) =>
      !Array.isArray(m.fields.Trending) || !m.fields.Trending.includes("Yes")
  )

  return (
    <div className="relative flex w-full flex-col overflow-x-hidden">
      <Header />
      <div id="hero">
        <MainHero />
      </div>

      <div className="container mx-auto px-4 lg:px-0">
        <div id="manufacturers">
          <ScrollReveal>
            <DataCards
              title="Trending Manufacturers"
              items={trendingCompanies}
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
                "Amount Raised",
                "Type",
                "Funding Round (from Funding Stage)",
                "# of Employees",
                "Year Founded",
                "HQ",
              ]}
            />
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal>
            <DataCards
              title="Manufacturers"
              items={companiesWithoutTrending}
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
                "Amount Raised",
                "Type",
                "Funding Round (from Funding Stage)",
                "# of Employees",
                "Year Founded",
                "HQ",
              ]}
            />
          </ScrollReveal>
        </div>

        <div id="aircrafts">
          <ScrollReveal>
            <DataCards
              title="Trending Aircrafts"
              items={trendingModels}
              config={{
                imageField: "Image",
                titleField: "Name",
                descriptionField: "Description ",
                fields: ["Type", "Unit", "Stage"],
              }}
              modalFields={[
                "Unit",
                "Type",
                "Range",
                "Top Speed",
                "Total Capacity",
                "Passenger Capacity",
                "Suitability",
                "Stage",
              ]}
            />
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal>
            <DataCards
              title="Aircrafts"
              items={modelsWithoutTrending}
              config={{
                imageField: "Image",
                titleField: "Name",
                descriptionField: "Description ",
                fields: ["Type", "Unit", "Stage"],
              }}
              modalFields={[
                "Unit",
                "Type",
                "Range",
                "Top Speed",
                "Total Capacity",
                "Passenger Capacity",
                "Suitability",
                "Stage",
              ]}
            />
            <ProductComparison items={models} config={{ titleField: "Name" }} />
          </ScrollReveal>
        </div>

        <div id="sales">
          <DataTable
            title="Sales"
            records={[]}
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
