"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import icons from "src/common/icons"

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
          const image = product.fields?.["Product Image"] || icons["planeIcon"]

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-start rounded-lg bg-[#2f2e38] p-6 text-center shadow-md"
            >
              <p className="mb-2 text-lg font-medium text-[#ddd]">{name}</p>
              <Image
                src={image}
                alt={name}
                width={1000}
                height={1000}
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
