import { useState } from 'react'
import { Plus, Trash2, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useScheduleStore } from '../store/useScheduleStore'
import { ScheduledPost, Platform, ScheduleStatus } from '../types'
import { generateId, formatDate } from '../lib/utils'
import Button from '../components/ui/Button'
import Badge  from '../components/ui/Badge'
import Modal  from '../components/ui/Modal'
import Input  from '../components/ui/Input'
import Select from '../components/ui/Select'

const PLATFORM_OPTIONS = [
  { value: 'YouTube', label: 'YouTube' }, { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok', label: 'TikTok' },  { value: 'Twitter', label: 'Twitter' },
]
const EMPTY_FORM = { title: '', platform: 'YouTube' as Platform, date: '', time: '14:00', status: 'Upcoming' as ScheduleStatus }

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEK_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function getPlatformColor(p: string) {
  return { YouTube: '#FF0000', Instagram: '#C13584', TikTok: '#333', Twitter: '#1DA1F2' }[p] ?? '#aaa'
}

export default function Schedule() {
  const { posts, addPost, updatePost, deletePost } = useScheduleStore()
  const [view, setView]       = useState<'calendar' | 'list'>('calendar')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]       = useState(EMPTY_FORM)

  const today = new Date()
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calYear,  setCalYear]  = useState(today.getFullYear())

  // Build calendar days
  const firstDay     = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate()
  const calDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calDays.push(d)

  function getEventsForDay(d: number) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    return posts.filter((p) => p.date === dateStr)
  }

  function prevMonth() { calMonth === 0 ? (setCalMonth(11), setCalYear(calYear - 1)) : setCalMonth(calMonth - 1) }
  function nextMonth() { calMonth === 11 ? (setCalMonth(0), setCalYear(calYear + 1)) : setCalMonth(calMonth + 1) }

  function handleSubmit() {
    if (!form.title.trim() || !form.date) { toast.error('Title and date are required'); return }
    addPost({ ...form, id: generateId() })
    toast.success('Post scheduled!')
    setShowModal(false)
    setForm(EMPTY_FORM)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-[#0d0f14]">Content Schedule</h2>
          <p className="text-sm text-gray-400 mt-1">{posts.filter(p => p.status === 'Upcoming').length} upcoming posts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
            {(['calendar', 'list'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${view === v ? 'bg-white shadow-sm text-[#0d0f14]' : 'text-gray-500'}`}>
                {v}
              </button>
            ))}
          </div>
          <Button variant="gold" onClick={() => setShowModal(true)}><Plus size={14} /> Schedule Post</Button>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
            <div className="flex items-center gap-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-all">←</button>
              <span className="font-display font-bold text-sm w-36 text-center">{MONTHS[calMonth]} {calYear}</span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-all">→</button>
            </div>
            <div className="flex gap-4">
              {['YouTube','Instagram','TikTok'].map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full" style={{ background: getPlatformColor(p) }} />
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="bg-[#0d0f14] text-white/50 text-[10px] font-semibold uppercase tracking-widest text-center py-2.5">
                {d}
              </div>
            ))}
            {calDays.map((d, i) => {
              const events = d ? getEventsForDay(d) : []
              const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()
              return (
                <div key={i} className={`min-h-[90px] p-2 border-r border-b border-black/5 ${!d ? 'bg-gray-50' : ''} ${isToday ? 'bg-amber-50/50' : ''}`}>
                  {d && (
                    <>
                      <span className={`text-xs font-semibold ${isToday ? 'text-[#c9a84c]' : 'text-gray-400'}`}>{d}</span>
                      <div className="mt-1 space-y-0.5">
                        {events.map((e) => (
                          <div
                            key={e.id}
                            className="text-[10px] px-1.5 py-0.5 rounded font-medium truncate"
                            style={{ background: `${getPlatformColor(e.platform)}15`, color: getPlatformColor(e.platform) }}
                          >
                            {e.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-black/5">
                {['Content','Platform','Date','Time','Status','Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {posts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-16 text-gray-400 text-sm">No scheduled posts yet</td></tr>
              ) : posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold">{p.title}</td>
                  <td className="px-6 py-4"><Badge variant={p.platform.toLowerCase() as 'youtube'}>{p.platform}</Badge></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(p.date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.time}</td>
                  <td className="px-6 py-4"><Badge variant={p.status === 'Posted' ? 'published' : 'active'}>{p.status}</Badge></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {p.status === 'Upcoming' && (
                        <Button size="sm" variant="outline" onClick={() => { updatePost(p.id, { status: 'Posted' }); toast.success('Marked as posted!') }}>
                          <CheckCircle size={11} /> Post
                        </Button>
                      )}
                      <Button size="sm" variant="danger" onClick={() => { deletePost(p.id); toast.success('Removed') }}>
                        <Trash2 size={11} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <Modal title="Schedule a Post" onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input label="Content Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Morning Routine Vlog" />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value as Platform })} options={PLATFORM_OPTIONS} />
              <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ScheduleStatus })}
                options={[{ value: 'Upcoming', label: 'Upcoming' }, { value: 'Posted', label: 'Posted' }, { value: 'Postponed', label: 'Postponed' }]} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <Input label="Time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}