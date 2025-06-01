export default function StatBar({ value, max }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
      <div className="h-full bg-[#d87103]" style={{ width: `${pct}%` }} />
    </div>
  )
}
