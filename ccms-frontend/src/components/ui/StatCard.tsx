interface StatCardProps {
  icon: string
  value: string | number
  label: string
  delta: string
  deltaUp?: boolean
  accent: 'gold' | 'teal' | 'coral' | 'lavender'
}

const accents = {
  gold:     'from-[#c9a84c] to-[#f0c96b]',
  teal:     'from-[#2cc4a0] to-[#4dd9bf]',
  coral:    'from-[#e8614d] to-[#f0856e]',
  lavender: 'from-[#7c6fcd] to-[#9e94e0]',
}

export default function StatCard({ icon, value, label, delta, deltaUp = true, accent }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 relative overflow-hidden hover:-translate-y-0.5 transition-transform">
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${accents[accent]}`} />
      <div className="text-2xl mb-3">{icon}</div>
      <div className="font-display font-extrabold text-3xl text-[#0d0f14] mb-1">{value}</div>
      <div className="text-xs text-gray-400 mb-2">{label}</div>
      <div className={`text-xs font-semibold ${deltaUp ? 'text-emerald-500' : 'text-red-400'}`}>
        {delta}
      </div>
    </div>
  )
}