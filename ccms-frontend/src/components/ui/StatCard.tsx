type StatCardProps = {
  icon: string
  value: string | number
  label: string
  delta: string
  deltaUp?: boolean
  accent: 'gold' | 'teal' | 'coral' | 'lavender'
}

const topBars: Record<string, string> = {
  gold:     'linear-gradient(90deg, #c9a84c, #f0c96b)',
  teal:     'linear-gradient(90deg, #2cc4a0, #4dd9bf)',
  coral:    'linear-gradient(90deg, #e8614d, #f0856e)',
  lavender: 'linear-gradient(90deg, #7c6fcd, #9e94e0)',
}

export default function StatCard({
  icon,
  value,
  label,
  delta,
  deltaUp = true,
  accent,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden hover:-translate-y-0.5 transition-transform">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: topBars[accent] }}
      />
      <div className="text-2xl mb-3">{icon}</div>
      <div className="font-bold text-3xl text-[#0d0f14] mb-1">{value}</div>
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className={`text-xs font-semibold ${deltaUp ? 'text-emerald-500' : 'text-red-400'}`}>
        {delta}
      </div>
    </div>
  )
}
