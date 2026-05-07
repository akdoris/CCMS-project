import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const ALL_NOTIFS = [
  { id: 1, type: 'deadline', icon: '⚠️', title: 'LumiLight Tech deadline approaching', desc: 'Your brand collab deadline is in 3 days. Submit deliverables on time.', time: '5 minutes ago',  unread: true,  category: 'collabs'   },
  { id: 2, type: 'success',  icon: '✅', title: 'NovaEdit Software collab completed',  desc: 'All deliverables approved. Invoice has been sent. Payment expected in 5 days.', time: '1 hour ago',    unread: true,  category: 'collabs'   },
  { id: 3, type: 'schedule', icon: '📅', title: 'Scheduled post reminder',             desc: 'Morning Routine Vlog is scheduled to go live on YouTube tomorrow at 2:00 PM.', time: '2 hours ago',   unread: false, category: 'schedule'  },
  { id: 4, type: 'collab',   icon: '🤝', title: 'New collaboration opportunity',       desc: 'UrbanBrew Coffee sent a collaboration request. Review and respond within 48h.', time: 'Yesterday',    unread: false, category: 'collabs'   },
  { id: 5, type: 'idea',     icon: '💡', title: 'Content idea reminder',               desc: '"Brand Deal Negotiation Stories" has been in Draft for 7 days. Time to work on it?', time: '2 days ago', unread: false, category: 'ideas' },
  { id: 6, type: 'system',   icon: '🔔', title: 'Welcome to CCMS!',                   desc: 'Your account is set up. Explore the dashboard and add your first content idea.', time: '3 days ago',   unread: false, category: 'system'    },
]

const FILTERS = ['All', 'Unread', 'Collabs', 'Schedule', 'Ideas', 'System']

export default function Notifications() {
  const [notifs,    setNotifs]    = useState(ALL_NOTIFS)
  const [filter,    setFilter]    = useState('All')

  const filtered = notifs.filter((n) => {
    if (filter === 'All')    return true
    if (filter === 'Unread') return n.unread
    return n.category.toLowerCase() === filter.toLowerCase()
  })

  const unread = notifs.filter((n) => n.unread).length

  function markRead(id: number) {
    setNotifs(notifs.map((n) => n.id === id ? { ...n, unread: false } : n))
  }

  function markAllRead() {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })))
    toast.success('All marked as read')
  }

  function deleteNotif(id: number) {
    setNotifs(notifs.filter((n) => n.id !== id))
    toast.success('Notification removed')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-bold text-2xl text-[#0d0f14]">Notifications</h2>
          <p className="text-sm text-gray-400 mt-1">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>✓ Mark all read</Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${filter === f ? 'bg-white shadow-sm text-[#0d0f14]' : 'text-gray-500'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔔</p>
            <p className="font-bold text-gray-700">No notifications</p>
            <p className="text-sm mt-1">You are all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((n) => (
              <div key={n.id}
                className={`flex items-start gap-4 px-5 py-4 transition-all ${n.unread ? 'bg-amber-50/40' : 'hover:bg-gray-50'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${n.unread ? 'bg-[#c9a84c]/10' : 'bg-gray-100'}`}>
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-snug ${n.unread ? 'font-semibold text-[#0d0f14]' : 'font-medium text-gray-700'}`}>
                      {n.title}
                    </p>
                    {n.unread && <div className="w-2 h-2 bg-[#c9a84c] rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{n.desc}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                    <Badge variant={
                      n.category === 'collabs'  ? 'active'     :
                      n.category === 'schedule' ? 'inprogress' :
                      n.category === 'ideas'    ? 'draft'      : 'published'
                    }>{n.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {n.unread && (
                    <button onClick={() => markRead(n.id)}
                      className="text-[11px] text-[#c9a84c] font-semibold hover:underline whitespace-nowrap">
                      Mark read
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)}
                    className="text-[11px] text-gray-400 hover:text-red-500 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}