import { useIdeasStore }    from '../store/useIdeasStore'
import { useCollabStore }   from '../store/useCollabStore'
import { useScheduleStore } from '../store/useScheduleStore'
import StatCard   from '../components/ui/StatCard'
import Badge      from '../components/ui/Badge'
import { formatDate } from '../lib/utils'

const SEED_ACTIVITY = [
  { color: '#c9a84c', text: 'Morning Routine Vlog published on YouTube', time: '2 hours ago' },
  { color: '#2cc4a0', text: 'NovaEdit collab marked as completed',        time: 'Yesterday'   },
  { color: '#7c6fcd', text: 'New idea added: Brand Deal Stories',         time: 'Yesterday'   },
  { color: '#e8614d', text: 'LumiLight Tech deadline approaching',        time: 'Auto-alert'  },
  { color: '#2cc4a0', text: 'Editing Speed Tips posted to TikTok',        time: '3 days ago'  },
]

export default function Dashboard() {
  const ideas    = useIdeasStore((s) => s.ideas)
  const collabs  = useCollabStore((s) => s.collabs)
  const posts    = useScheduleStore((s) => s.posts)

  const published      = ideas.filter((i) => i.status === 'Published').length
  const activeCollabs  = collabs.filter((c) => c.status === 'Active').length
  const upcoming       = posts.filter((p) => p.status === 'Upcoming').length
  const totalRevenue   = collabs.reduce((a, b) => a + b.payment, 0)

  const weeklyViews = [42, 38, 55, 71, 48, 88, 65]
  const maxView     = Math.max(...weeklyViews)
  const weekDays    = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-[#0d0f14]">
            Good morning, Amina ✦
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Here's what's happening with your content today
          </p>
        </div>
        <p className="text-sm text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon="💡" value={ideas.length}   label="Total Ideas"    delta="+3 this week"    accent="gold" />
        <StatCard icon="✅" value={published}       label="Published"      delta="+2 this month"   accent="teal" />
        <StatCard icon="🤝" value={activeCollabs}   label="Active Collabs" delta="1 deadline soon" accent="coral"    deltaUp={false} />
        <StatCard icon="📅" value={upcoming}        label="Scheduled Posts" delta="Next: tomorrow" accent="lavender" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-5">
        {/* Weekly views */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/5">
            <h3 className="font-display font-bold text-sm">Weekly Engagement</h3>
            <span className="text-xs text-gray-400">Views (k)</span>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-2 h-20 mb-2">
              {weeklyViews.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all ${i === 5 ? 'bg-[#c9a84c]' : 'bg-gray-100'}`}
                    style={{ height: `${(v / maxView) * 100}%` }}
                  />
                  <span className="text-[10px] text-gray-400">{weekDays[i]}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-gray-400">Total: <strong>88.5k views</strong></span>
              <span className="text-emerald-500 font-semibold">↑ 12% vs last week</span>
            </div>
          </div>
        </div>

        {/* Revenue pipeline */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/5">
            <h3 className="font-display font-bold text-sm">Revenue Pipeline</h3>
            <span className="text-sm font-bold text-[#c9a84c]">${totalRevenue.toLocaleString()}</span>
          </div>
          <div className="p-6 space-y-4">
            {collabs.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  c.status === 'Active' ? 'bg-emerald-400' :
                  c.status === 'Completed' ? 'bg-[#c9a84c]' :
                  c.status === 'Pending' ? 'bg-violet-400' : 'bg-gray-300'
                }`} />
                <span className="flex-1 text-sm font-medium truncate">{c.brand}</span>
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c9a84c] rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#c9a84c] w-14 text-right">
                  ${c.payment.toLocaleString()}
                </span>
              </div>
            ))}
            {collabs.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No collaborations yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-5">
        {/* Upcoming posts */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-black/5">
            <h3 className="font-display font-bold text-sm">Upcoming Posts</h3>
            <Badge variant="active">{upcoming} scheduled</Badge>
          </div>
          <table className="w-full">
            <tbody>
              {posts.slice(0, 4).map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-sm font-semibold">{p.title}</td>
                  <td className="px-6 py-3">
                    <Badge variant={p.platform.toLowerCase() as 'youtube'}>{p.platform}</Badge>
                  </td>
                  <td className="px-6 py-3 text-xs text-gray-400">{formatDate(p.date)}</td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr><td colSpan={3} className="px-6 py-8 text-sm text-gray-400 text-center">No scheduled posts yet</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm">
          <div className="px-6 pt-5 pb-4 border-b border-black/5">
            <h3 className="font-display font-bold text-sm">Recent Activity</h3>
          </div>
          <div className="px-6 divide-y divide-black/5">
            {SEED_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                <div>
                  <p className="text-sm text-[#0d0f14] leading-snug">{a.text}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}