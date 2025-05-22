export default function ProductCard({ item, onClick, config }) {
  const { titleField = "Company Name", descriptionField = "Company Summary" } =
    config

  return (
    <div
      className="group w-full bg-[#f5f5f5] text-[#403f4c] rounded-xl shadow-md p-8 cursor-pointer hover:bg-[#403f4c] transition-all h-full"
      onClick={() => onClick?.(item)}
    >
      <div className="flex items-center gap-5 mb-6">
        <h3 className="text-2xl font-bold group-hover:text-[#f5f5f5]">
          {item.fields[titleField]}
        </h3>
      </div>
      <p className="text-base line-clamp-4 group-hover:text-[#f5f5f5]">
        {item.fields[descriptionField] || "No description available."}
      </p>
    </div>
  )
}
