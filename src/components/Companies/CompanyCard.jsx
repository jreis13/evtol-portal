import Image from "next/image"

export default function CompanyCard({ item, onClick, config }) {
  const { titleField = "Company Name" } = config || {}

  const {
    [titleField]: name,
    "Market Share (%)": marketShare,
    "Amount Raised": raised,
    "# of Employees": employees,
    "Year Founded": founded,
    HQ,
  } = item.fields

  return (
    <div className="group relative flex size-full cursor-pointer flex-col rounded-xl bg-[#f5f5f5] p-8 text-[#403f4c] shadow-md transition-all hover:bg-[#403f4c]">
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
      <h3 className="mb-6 text-xl font-semibold group-hover:text-[#f5f5f5]">
        {name}
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm group-hover:text-[#f5f5f5]">
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
          <div className="mb-1 flex justify-between text-sm">
            <span>Market Share:</span>
            <span>{marketShare}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
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
