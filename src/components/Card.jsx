import Image from "next/image"

export default function Card({ item, onClick, config }) {
  const {
    imageField = "Logo",
    titleField = "Company Name",
    descriptionField = "Company Summary",
    fields = [],
  } = config

  console.log("📦 item.fields", item.fields)

  return (
    <div
      className="group w-full bg-[#f5f5f5] text-[#403f4c] rounded-xl shadow-md p-8 cursor-pointer hover:bg-[#403f4c] transition-all h-full"
      onClick={() => onClick?.(item)}
    >
      <div className="flex items-center gap-5 mb-6">
        {item.fields[imageField] ? (
          <Image
            src={item.fields[imageField]}
            alt={item.fields[titleField]}
            width={70}
            height={70}
            className="rounded-md object-contain h-[70px] w-[70px]"
          />
        ) : (
          <div className="h-[70px] w-[70px] bg-[#555] rounded-md" />
        )}
        <h3 className="text-2xl font-bold group-hover:text-[#f5f5f5]">
          {item.fields[titleField]}
        </h3>
      </div>
      <p className="text-base mb-6 line-clamp-4 group-hover:text-[#f5f5f5]">
        {item.fields[descriptionField] || "No description available."}
      </p>
      <div className="text-base space-y-1">
        {fields.map((field) => (
          <p key={field} className="group-hover:text-[#f5f5f5]">
            <strong>{field.replace(/\s?\(.*?\)/, "")}:</strong>{" "}
            {item.fields[field] || "—"}
          </p>
        ))}
      </div>
    </div>
  )
}
