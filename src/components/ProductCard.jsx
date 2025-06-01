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
    <div className="group relative flex size-full cursor-pointer flex-col justify-between rounded-xl bg-[#f5f5f5] p-8 text-[#403f4c] shadow-md transition-all hover:bg-[#403f4c]">
      <button
        onClick={() => onClick?.(item)}
        className="absolute right-2 size-[50px] rounded-md"
      >
        <Image
          src={"/icons/click-icon.svg"}
          alt={name}
          width={1000}
          height={1000}
        />
      </button>

      <div className="mb-4 flex flex-col">
        <div className="flex min-h-[70px] items-center gap-4">
          <div className="flex size-[70px] items-center justify-center">
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
          <div className="mx-auto mt-2 rounded-full border border-[#403f4c] bg-[#d87103] p-1 group-hover:border-[#f5f5f5] group-hover:text-[#f5f5f5]">
            <span className="text-xs">{item.fields[unit]}</span>
          </div>
        )}
      </div>

      <div className="mb-4 flex flex-col gap-6">
        <div className="flex w-full justify-between">
          {rangeValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatGauge
                value={rangeValue}
                max={maxRange}
                textColor="currentColor"
              />
              <div className="mt-4 text-center text-sm">
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
              <div className="mt-4 text-center text-sm">
                <div className="font-medium">Top Speed</div>
                <div>{item.fields[speedField]}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          {passengerValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatBar value={passengerValue} max={maxPassengers} />
              <div className="mt-4 text-center text-sm">
                <div className="font-medium">Passenger Capacity</div>
                <div>{item.fields[passengerField]}</div>
              </div>
            </div>
          )}

          {totalValue > 0 && (
            <div className="flex flex-col items-center text-[#403f4c] group-hover:text-[#f5f5f5]">
              <StatBar value={totalValue} max={maxPassengers} />
              <div className="mt-4 text-center text-sm">
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
          <div className="my-2 h-px rounded-full bg-[#403f4c] group-hover:bg-[#f5f5f5]" />
          <div className="inline-block rounded-full bg-[#d87103] px-3 py-1 text-xs group-hover:text-[#f5f5f5]">
            {item.fields[stageField]}
          </div>
        </div>
      )}
    </div>
  )
}
