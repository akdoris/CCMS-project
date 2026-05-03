import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useCollabStore } from '../store/useCollabStore'
import type { BrandCollab, CollabStatus } from '../types/index'
import { generateId, formatDate, daysUntil } from '../lib/utils'
import Button from '../components/ui/Button'
import Badge  from '../components/ui/Badge'
import Modal  from '../components/ui/Modal'
import Input  from '../components/ui/Input'
import Select from '../components/ui/Select'

const STATUS_OPTIONS = [
  { value: 'Pending', label: 'Pending' }, { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' }, { value: 'Cancelled', label: 'Cancelled' },
]
const STATUS_FILTERS = ['All','Pending','Active','Completed','Cancelled']
type FormState = { brand:string; contact:string; deliverables:string; deadline:string; payment:number; status:CollabStatus; notes:string; progress:number }
const EMPTY_FORM: FormState = { brand:'', contact:'', deliverables:'', deadline:'', payment:0, status:'Pending', notes:'', progress:0 }
const progressColor = (s:string) => s==='Completed'?'#2cc4a0':s==='Cancelled'?'#e5e7eb':'#c9a84c'

export default function Collabs() {
  const { collabs, addCollab, updateCollab, deleteCollab } = useCollabStore()
  const [filter, setFilter]       = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing]     = useState<BrandCollab|null>(null)
  const [form, setForm]           = useState<FormState>(EMPTY_FORM)

  const filtered      = filter==='All' ? collabs : collabs.filter(c=>c.status===filter)
  const totalEarned   = collabs.filter(c=>c.status==='Completed').reduce((a,b)=>a+b.payment,0)
  const pipeline      = collabs.filter(c=>['Active','Pending'].includes(c.status)).reduce((a,b)=>a+b.payment,0)

  function openNew()          { setEditing(null); setForm(EMPTY_FORM); setShowModal(true) }
  function openEdit(c:BrandCollab) { setEditing(c); setForm({brand:c.brand,contact:c.contact,deliverables:c.deliverables,deadline:c.deadline,payment:c.payment,status:c.status,notes:c.notes,progress:c.progress}); setShowModal(true) }

  function handleSubmit() {
    if (!form.brand.trim()) { toast.error('Brand name required'); return }
    if (editing) { updateCollab(editing.id, form); toast.success('Updated!') }
    else { addCollab({ ...form, id: generateId() }); toast.success('Collab added!') }
    setShowModal(false)
  }

  return (
      <div className="space-y-5 md:space-y-6">

        {/* Header */}
        <div className="flex items-start sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-bold text-xl md:text-2xl text-[#0d0f14]">Brand Collaborations</h2>
            <p className="text-sm text-gray-400 mt-1">{collabs.length} total · ${totalEarned.toLocaleString()} earned</p>
          </div>
          <Button variant="gold" size="sm" onClick={openNew}>+ Add Collab</Button>
        </div>

        {/* KPIs — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label:'Total Earned', val:`$${totalEarned.toLocaleString()}`, color:'#2cc4a0' },
            { label:'In Pipeline',  val:`$${pipeline.toLocaleString()}`,    color:'#c9a84c' },
            { label:'Active Deals', val:collabs.filter(c=>c.status==='Active').length,  color:'#7c6fcd' },
            { label:'Pending',      val:collabs.filter(c=>c.status==='Pending').length, color:'#9ca3af' },
          ].map((k,i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
                <div className="font-bold text-xl md:text-2xl mb-1" style={{color:k.color}}>{k.val}</div>
                <div className="text-xs text-gray-400">{k.label}</div>
              </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto w-full sm:w-fit">
          {STATUS_FILTERS.map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${filter===s?'bg-white shadow-sm text-[#0d0f14]':'text-gray-500'}`}>
                {s}
              </button>
          ))}
        </div>

        {/* Cards — 1 col mobile, 2 col desktop */}
        {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🤝</p>
              <p className="font-bold text-gray-700">No collaborations here</p>
              <p className="text-sm mt-1">Add your first brand deal</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((c) => {
                const days   = daysUntil(c.deadline)
                const urgent = days <= 3 && c.status !== 'Completed' && c.status !== 'Cancelled'
                return (
                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 mr-2">
                          <h3 className="font-bold text-base text-[#0d0f14] truncate">{c.brand}</h3>
                          <p className="text-xs text-gray-400 mt-0.5 truncate">{c.contact}</p>
                        </div>
                        <Badge variant={c.status.toLowerCase() as 'active'}>{c.status}</Badge>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full rounded-full transition-all duration-500" style={{width:`${c.progress}%`, backgroundColor:progressColor(c.status)}} />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                          {label:'Deliverables', val:c.deliverables},
                          {label:'Payment',      val:<span style={{color:'#c9a84c',fontWeight:700}}>${c.payment.toLocaleString()}</span>},
                          {label:'Deadline',     val:<span style={{color:urgent?'#e8614d':'#0d0f14'}}>{urgent?`⚠ ${days}d left`:formatDate(c.deadline)}</span>},
                          {label:'Progress',     val:`${c.progress}%`},
                        ].map((m,i) => (
                            <div key={i}>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">{m.label}</p>
                              <p className="text-sm font-medium text-[#0d0f14]">{m.val}</p>
                            </div>
                        ))}
                      </div>
                      {c.notes && <p className="text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2 mb-4 leading-relaxed">{c.notes}</p>}
                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" onClick={() => openEdit(c)}>✏ Edit</Button>
                        {c.status === 'Pending'   && <Button size="sm" variant="outline" onClick={() => {updateCollab(c.id,{status:'Active'});    toast.success('Activated!')}} className="text-violet-600 border-violet-200">→ Activate</Button>}
                        {c.status === 'Active'    && <Button size="sm" variant="outline" onClick={() => {updateCollab(c.id,{status:'Completed'}); toast.success('Completed!')}} className="text-emerald-600 border-emerald-200">✓ Complete</Button>}
                        <Button size="sm" variant="danger" className="ml-auto" onClick={() => {deleteCollab(c.id); toast.success('Removed')}}>🗑</Button>
                      </div>
                    </div>
                )
              })}
            </div>
        )}

        {/* Modal */}
        {showModal && (
            <Modal title={editing?'Edit Collaboration':'New Brand Collaboration'} onClose={()=>setShowModal(false)} onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Brand Name" value={form.brand} onChange={(e)=>setForm({...form,brand:e.target.value})} placeholder="e.g. TechBrand Inc." />
                  <Input label="Contact Email" type="email" value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} placeholder="contact@brand.com" />
                </div>
                <Input label="Deliverables" value={form.deliverables} onChange={(e)=>setForm({...form,deliverables:e.target.value})} placeholder="e.g. 2x YouTube integrations" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Payment ($)" type="number" value={form.payment} onChange={(e)=>setForm({...form,payment:parseFloat(e.target.value)||0})} placeholder="1500" />
                  <Input label="Deadline" type="date" value={form.deadline} onChange={(e)=>setForm({...form,deadline:e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select label="Status" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value as CollabStatus})} options={STATUS_OPTIONS} />
                  <Input label="Progress (%)" type="number" min={0} max={100} value={form.progress} onChange={(e)=>setForm({...form,progress:Number(e.target.value)})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Notes</label>
                  <textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] resize-none" rows={3}
                            placeholder="Any important notes…" value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
                </div>
              </div>
            </Modal>
        )}
      </div>
  )
}