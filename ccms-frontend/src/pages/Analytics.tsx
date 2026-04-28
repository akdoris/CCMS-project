import { useIdeasStore }  from '../store/useIdeasStore'
import { useCollabStore } from '../store/useCollabStore'
import StatCard from '../components/ui/StatCard'
import Badge    from '../components/ui/Badge'

const PLATFORM_COLORS: Record<string, string> = {
  YouTube:   '#FF0000',
  Instagram: '#C13584',
  TikTok:    '#333333',
  Twitter:   '#1DA1F2',
}

const PLATFORMS = ['YouTube', 'Instagram', 'TikTok', 'Twitter']

export default function Analytics() {
  const ideas   = useIdeasStore((s) => s.ideas)
  const collabs = useCollabStore((s) => s.collabs)

  const weeklyViews    = [42, 38, 55, 71, 48, 88, 65]
  const monthlyRevenue = [1200, 2800, 1950, 3400]
  const months         = ['Jan', 'Feb', 'Mar', 'Apr']
  const maxView        = Math.max(...weeklyViews)
  const maxRev         = Math.max(...monthlyRevenue)
  const maxPlatform    = Math.max(
    ...PLATFORMS.map((p) => ideas.filter((i) => i.platform === p).length),
    1
  )

  const statusCounts = [
    { label: 'Draft',       count: ideas.filter((i) => i.status === 'Draft').length,      color: '#9ca3af' },
    { label: 'In Progress', count: ideas.filter((i) => i.status === 'InProgress').length,  color: '#c9a84c' },
    { label: 'Published',   count: ideas.filter((i) => i.status === 'Published').length,   color: '#2cc4a0' },
  ]

  const published = ideas.filter((i) => i.status === 'Published')

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="font-bold text-2xl text-[#0d0f14]">Analytics</h2>
        <p className="text-sm text-gray-400 mt-1">
          Performance overview for your content and collaborations
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon="👁"  value="88.5K" label="Total Views"      delta="+12% this week"   accent="gold"     />
        <StatCard icon="❤️" value="6.4%"  label="Avg Engagement"   delta="+0.8% this month" accent="teal"     />
        <StatCard icon="💰" value="$8,750" label="Revenue (YTD)"    delta="+34% vs last yr"  accent="lavender" />
        <StatCard icon="📢" value={published.length} label="Posts Published" delta="this month" accent="coral" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-5">

        {/* Weekly Views */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#0d0f14]">Weekly Views (k)</h3>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-3 h-24 mb-3">
              {weeklyViews.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: i === 5 ? '#c9a84c' : '#9ca3af' }}
                  >
                    {v}k
                  </span>
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height:          `${(v / maxView) * 80}px`,
                      backgroundColor: i === 5 ? '#c9a84c' : '#f3f4f6',
                    }}
                  />
                  <span className="text-[10px] text-gray-400">
                    {['M','T','W','T','F','S','S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#0d0f14]">Monthly Revenue ($)</h3>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-4 h-24 mb-3">
              {monthlyRevenue.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400">
                    ${(v / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height:          `${(v / maxRev) * 80}px`,
                      backgroundColor: i === 3 ? '#2cc4a0' : '#f3f4f6',
                    }}
                  />
                  <span className="text-[10px] text-gray-400">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-5">

        {/* Platform Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#0d0f14]">Content by Platform</h3>
          </div>
          <div className="p-6 space-y-4">
            {PLATFORMS.map((p) => {
              const count = ideas.filter((i) => i.platform === p).length
              return (
                <div key={p}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#0d0f14]">{p}</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: PLATFORM_COLORS[p] }}
                    >
                      {count} ideas
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width:           `${(count / maxPlatform) * 100}%`,
                        backgroundColor: PLATFORM_COLORS[p],
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-sm text-[#0d0f14]">Idea Status Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="flex justify-around mb-6">
              {statusCounts.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{
                      backgroundColor: `${s.color}20`,
                      border:          `3px solid ${s.color}`,
                    }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{ color: s.color }}
                    >
                      {s.count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Top Published Content
              </p>
              {published.slice(0, 3).map((i) => (
                <div key={i.id} className="flex items-center gap-2 mb-2">
                  <Badge variant={i.platform.toLowerCase() as 'youtube'}>{i.platform}</Badge>
                  <span className="text-xs font-medium flex-1 truncate text-[#0d0f14]">{i.title}</span>
                  <span className="text-xs text-emerald-500 font-semibold">Live</span>
                </div>
              ))}
              {published.length === 0 && (
                <p className="text-xs text-gray-400">No published content yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
