import Image from "next/image"
import StatBar from "./StatBar"
import StatGauge from "./StatGauge"

export default function ProductCard({ item, onClick, config = {} }) {
  const {
    image = "Logo Company",
    name = "Name",
    maxRange = 1400,
    maxSpeed = 644,
    maxPassengers = 10,
  } = config

  const imageSrc = item.fields[image] || "/portal.png"

  const {
    unit = "Unit",
    range: rangeField = "Range",
    speed: speedField = "Top Speed",
    total: totalField = "Total Capacity",
    passenger: passengerField = "Passenger Capacity",
    stage: stageField = "Stage",
  } = item.fields

  const parseNumber = (value) =>
    parseFloat(String(value).replace(/,/g, "")) || 0

  const rangeValue = parseNumber(item.fields[rangeField])
  const speedValue = parseNumber(item.fields[speedField])
  const passengerValue = parseNumber(item.fields[passengerField])
  const totalValue = parseNumber(item.fields[totalField])

  return (
    <div className="relative group w-full bg-[#f5f5f5] text-[#403f4c] rounded-xl shadow-md p-8 cursor-pointer hover:bg-[#403f4c] transition-all h-full flex flex-col justify-between">
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
        <div className="flex items-center gap-4 min-h-[70px]">
          <div className="w-[70px] h-[70px] flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={item.fields[name] || name}
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold group-hover:text-[#f5f5f5]">
            {item.fields[name]}
          </h3>
        </div>
        {item.fields[unit] && (
          <div className="group-hover:text-[#f5f5f5] mx-auto bg-[#d87103] p-1 rounded-full border border-[#403f4c] group-hover:border-[#f5f5f5] mt-2">
            <span className="text-xs">{item.fields[unit]}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 mb-4">
        <div className="w-full flex justify-between">
          {rangeValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatGauge
                value={rangeValue}
                max={maxRange}
                textColor="currentColor"
              />
              <div className="mt-4 text-sm text-center">
                <div className="font-medium">Range</div>
                <div>{item.fields[rangeField]}</div>
              </div>
            </div>
          )}

          {speedValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatGauge
                value={speedValue}
                max={maxSpeed}
                textColor="currentColor"
              />
              <div className="mt-4 text-sm text-center">
                <div className="font-medium">Top Speed</div>
                <div>{item.fields[speedField]}</div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col justify-between gap-4">
          {passengerValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatBar value={passengerValue} max={maxPassengers} />
              <div className="mt-4 text-sm text-center">
                <div className="font-medium">Passenger Capacity</div>
                <div>{item.fields[passengerField]}</div>
              </div>
            </div>
          )}

          {totalValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatBar value={totalValue} max={maxPassengers} />
              <div className="mt-4 text-sm text-center">
                <div className="font-medium">Total Capacity</div>
                <div>{item.fields[totalField]}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {item.fields[stageField] && (
        <div className="text-center">
          <p className="text-sm group-hover:text-[#f5f5f5]">Stage</p>
          <div className="h-[1px] bg-[#403f4c] rounded-full my-2 group-hover:bg-[#f5f5f5]" />
          <div className="inline-block bg-[#d87103] px-3 py-1 rounded-full text-xs group-hover:text-[#f5f5f5]">
            {item.fields[stageField]}
          </div>
        </div>
      )}
    </div>
  )
}
