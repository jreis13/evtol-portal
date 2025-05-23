import { useEffect, useRef, useState } from "react"

export default function Dropdown({ attributes, selectedValue, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [dropdownWidth, setDropdownWidth] = useState("auto")

  useEffect(() => {
    if (dropdownRef.current) {
      const longestOptionWidth = Math.max(
        ...attributes.map((attr) => measureText(attr)),
        measureText(selectedValue)
      )
      const newWidth = longestOptionWidth + 32

      if (dropdownWidth !== newWidth) {
        setDropdownWidth(newWidth)
      }
    }
  }, [attributes, selectedValue, dropdownWidth])

  const measureText = (text) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.font = "16px Arial"
    return context.measureText(text.charAt(0).toUpperCase() + text.slice(1))
      .width
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className="w-full rounded-lg border border-gray-700 bg-[#34333d] px-4 py-2 text-left text-[#e8e8e8] hover:bg-gray-600 focus:outline-none"
      >
        {selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 rounded-lg border border-gray-700 bg-[#34333d]">
          {attributes.map((attr) => (
            <li
              key={attr}
              onClick={() => {
                onChange(attr)
                setIsOpen(false)
              }}
              className="cursor-pointer px-4 py-2 text-[#e8e8e8] hover:rounded hover:bg-[#2d2c39] hover:text-white"
            >
              {attr.charAt(0).toUpperCase() + attr.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
