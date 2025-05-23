import Image from "next/image"

export default function ProductCard({ item, onClick, config }) {
  const { image = "Logo Company", name = "Name" } = config || {}

  const imageSrc = item.fields[image] || "/portal.png"

  const {
    unit = "Unit",
    range = "Range",
    speed = "Top Speed",
    total = "Total Capacity",
    passenger = "Passenger Capacity",
    stage = "Stage",
  } = item.fields

  return (
    <div className="relative group w-full bg-[#f5f5f5] text-[#403f4c] rounded-xl shadow-md p-8 cursor-pointer hover:bg-[#403f4c] transition-all h-full flex flex-col jusify-between">
      <button
        onClick={() => onClick?.(item)}
        className="rounded-md h-[50px] w-[50px] absolute right-2"
      >
        <Image
          src={"/icons/click-icon.svg"}
          alt={name}
          width={1000}
          height={1000}
        />
      </button>
      <div className="flex mb-4 flex-col">
        <div className="gap-4 flex items-center">
          <Image
            src={imageSrc}
            alt={name}
            width={1000}
            height={1000}
            className="rounded-md object-contain h-[70px] w-[70px]"
          />
          <h3 className="text-xl font-semibold group-hover:text-[#f5f5f5]">
            {item.fields[name]}
          </h3>
        </div>
        {item.fields[unit] && (
          <div className="group-hover:text-[#f5f5f5] mx-auto bg-[#d87103] p-1 rounded-full border border-[#403f4c] group-hover:border-[#f5f5f5]">
            <div className="flex justify-between text-xs">
              <span>{item.fields[unit]}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 text-sm mb-4 group-hover:text-[#f5f5f5]">
        <div className="grid grid-cols-2 gap-4">
          {item.fields[range] && (
            <div>
              <div className="font-medium">Range</div>
              <div>{item.fields[range]}</div>
            </div>
          )}
          {item.fields[speed] && (
            <div className="text-right">
              <div className="font-medium">Top Speed</div>
              <div>{item.fields[speed]}</div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {item.fields[passenger] && (
            <div>
              <div className="font-medium">Passenger Capacity</div>
              <div>{item.fields[passenger]}</div>
            </div>
          )}
          {item.fields[total] && (
            <div className="text-right">
              <div className="font-medium">Total Capacity</div>
              <div>{item.fields[total]}</div>
            </div>
          )}
        </div>

        {item.fields[stage] && (
          <>
            <p className="text-center text-sm group-hover:text-[#f5f5f5]">
              Stage
            </p>
            <div className="h-[1px] bg-[#403f4c] rounded-full group-hover:bg-[#f5f5f5]" />
            <div className="group-hover:text-[#f5f5f5] mx-auto bg-[#d87103] p-1 rounded-full border border-[#403f4c] group-hover:border-[#f5f5f5]">
              <div className="flex justify-between text-xs text-center">
                <span>{item.fields[stage]}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
