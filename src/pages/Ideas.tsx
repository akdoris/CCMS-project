import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useIdeasStore } from '../store/useIdeasStore'
import type { ContentIdea, Platform, IdeaStatus } from '../types/index'
import { generateId } from '../lib/utils'
import Button from '../components/ui/Button'
import Badge  from '../components/ui/Badge'
import Modal  from '../components/ui/Modal'
import Input  from '../components/ui/Input'
import Select from '../components/ui/Select'

const PLATFORM_OPTIONS = [
  { value: 'YouTube',   label: 'YouTube'   },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'TikTok',   label: 'TikTok'    },
  { value: 'Twitter',  label: 'Twitter'   },
]
const STATUS_OPTIONS = [
  { value: 'Draft',      label: 'Draft'       },
  { value: 'InProgress', label: 'In Progress' },
  { value: 'Published',  label: 'Published'   },
]
const STATUS_FILTERS = ['All', 'Draft', 'InProgress', 'Published']

type FormState = {
  title: string; description: string; category: string
  platform: Platform; status: IdeaStatus
}
const EMPTY_FORM: FormState = {
  title: '', description: '', category: '', platform: 'YouTube', status: 'Draft',
}
const statusLabel = (s: string) => s === 'InProgress' ? 'In Progress' : s

export default function Ideas() {
  const { ideas, addIdea, updateIdea, deleteIdea } = useIdeasStore()
  const [search,    setSearch]    = useState('')
  const [filter,    setFilter]    = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editing,   setEditing]   = useState<ContentIdea | null>(null)
  const [form,      setForm]      = useState<FormState>(EMPTY_FORM)

  const filtered = ideas.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || i.status === filter
    return matchSearch && matchFilter
  })

  function openNew() { setEditing(null); setForm(EMPTY_FORM); setShowModal(true) }
  function openEdit(idea: ContentIdea) {
    setEditing(idea)
    setForm({ title: idea.title, description: idea.description, category: idea.category, platform: idea.platform, status: idea.status })
    setShowModal(true)
  }
  function handleSubmit() {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (editing) { updateIdea(editing.id, form); toast.success('Idea updated!') }
    else { addIdea({ ...form, id: generateId(), createdAt: new Date().toISOString() }); toast.success('Idea added!') }
    setShowModal(false)
  }

  return (
      <div className="space-y-5 md:space-y-6">

        {/* Header */}
        <div className="flex items-start sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-bold text-xl md:text-2xl text-[#0d0f14]">Content Ideas</h2>
            <p className="text-sm text-gray-400 mt-1">
              {ideas.length} ideas · {ideas.filter((i) => i.status === 'Draft').length} drafts
            </p>
          </div>
          <Button variant="gold" onClick={openNew} size="sm">+ New Idea</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#c9a84c]"
                placeholder="Search ideas…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
            {STATUS_FILTERS.map((s) => (
                <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-2.5 md:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        filter === s ? 'bg-white text-[#0d0f14] shadow-sm' : 'text-gray-500'
                    }`}
                >
                  {statusLabel(s)}
                </button>
            ))}
          </div>
        </div>

        {/* Cards — 1 col mobile, 2 col tablet, 3 col desktop */}
        {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">💡</p>
              <p className="font-bold text-gray-700">No ideas found</p>
              <p className="text-sm mt-1">Try adjusting filters or add a new idea</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              {filtered.map((idea) => (
                  <div
                      key={idea.id}
                      onClick={() => openEdit(idea)}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 cursor-pointer group hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-sm text-[#0d0f14] leading-snug flex-1 mr-2">
                        {idea.title}
                      </h3>
                      <button
                          onClick={(e) => { e.stopPropagation(); deleteIdea(idea.id); toast.success('Deleted') }}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                      >
                        🗑
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                      {idea.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge variant={idea.status.toLowerCase() as 'draft'}>{statusLabel(idea.status)}</Badge>
                        <Badge variant={idea.platform.toLowerCase() as 'youtube'}>{idea.platform}</Badge>
                      </div>
                      <span className="text-[10px] text-gray-400">{idea.category}</span>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Modal */}
        {showModal && (
            <Modal title={editing ? 'Edit Idea' : 'New Content Idea'} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Morning Routine Vlog" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                  <textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] resize-none" rows={3}
                            placeholder="What is this content about?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Lifestyle" />
                  <Select label="Platform" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value as Platform })} options={PLATFORM_OPTIONS} />
                </div>
                <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as IdeaStatus })} options={STATUS_OPTIONS} />
              </div>
            </Modal>
        )}
      </div>
  )
}