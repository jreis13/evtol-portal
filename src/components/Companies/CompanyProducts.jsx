"use client"

import { useEffect, useState } from "react"

export default function CompanyProducts({ productNames = [] }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!productNames.length) return

    fetch("/api/models")
      .then((res) => res.json())
      .then((allProducts) => {
        const matched = allProducts.filter((p) =>
          productNames.includes(p.fields?.Name)
        )
        setProducts(matched)
      })
      .catch(console.error)
  }, [productNames])

  if (!products.length) return null

  const count = products.length
  let gridCols =
    count === 1
      ? "grid-cols-1 place-items-center"
      : count === 2 || count === 4
        ? "grid-cols-2"
        : "grid-cols-3"

  return (
    <div className="flex flex-col py-4 lg:pt-8">
      <h3 className="mb-4 text-xl font-semibold text-[#f5f5f5]">Products</h3>
      <div className={`grid w-full gap-4 ${gridCols}`}>
        {products.map((product, i) => {
          const name = product.fields?.Name || "Unnamed Product"

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-start rounded-lg bg-[#2f2e38] p-6 text-center shadow-md"
            >
              <p className="text-lg font-medium text-[#ddd]">{name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
