export default function StatBar({ value, max }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div className="bg-[#d87103] h-full" style={{ width: `${pct}%` }} />
    </div>
  )
}
