import Image from "next/image"

export default function CompanyCard({ item, onClick, config }) {
  const { imageField = "Logo", titleField = "Company Name" } = config || {}

  const {
    [imageField]: logo,
    [titleField]: name,
    "Market Share (%)": marketShare,
    "Amount Raised": raised,
    "# of Employees": employees,
    "Year Founded": founded,
    HQ,
  } = item.fields

  return (
    <div className="relative group w-full bg-[#f5f5f5] text-[#403f4c] rounded-xl shadow-md p-8 cursor-pointer hover:bg-[#403f4c] transition-all h-full flex flex-col">
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
      <div className="flex items-center mb-4">
        {logo && (
          <div className="gap-4 mb-6 flex items-center">
            <Image
              src={logo}
              alt={name}
              width={1000}
              height={1000}
              className="rounded-md object-contain h-[70px] w-[70px]"
            />
            <h3 className="text-xl font-semibold group-hover:text-[#f5f5f5]">
              {name}
            </h3>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4 group-hover:text-[#f5f5f5]">
        {raised && (
          <div>
            <div className="font-medium">Amount Raised</div>
            <div>{raised}</div>
          </div>
        )}
        {employees && (
          <div className="text-right">
            <div className="font-medium">Employees</div>
            <div>{employees}</div>
          </div>
        )}
        {founded && (
          <div>
            <div className="font-medium">Founded</div>
            <div>{founded}</div>
          </div>
        )}
        {HQ && (
          <div className="text-right">
            <div className="font-medium">HQ</div>
            <div>{HQ}</div>
          </div>
        )}
      </div>
      {Number.isFinite(+marketShare) && (
        <div className="mb-4 group-hover:text-[#f5f5f5]">
          <div className="flex justify-between text-sm mb-1">
            <span>Market Share:</span>
            <span>{marketShare}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#d87103]"
              style={{ width: `${marketShare}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
