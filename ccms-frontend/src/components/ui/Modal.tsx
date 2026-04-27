import { X } from 'lucide-react'
import Button from './Button'

interface ModalProps {
  title: string
  onClose: () => void
  onSubmit: () => void
  submitLabel?: string
  loading?: boolean
  children: React.ReactNode
}

export default function Modal({
  title, onClose, onSubmit,
  submitLabel = 'Save', loading, children,
}: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-black/5">
          <h2 className="font-display font-bold text-base text-[#0d0f14]">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
            <X size={15} />
          </button>
        </div>
        <div className="px-7 py-6">{children}</div>
        <div className="flex justify-end gap-2.5 px-7 pb-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="gold" onClick={onSubmit} loading={loading}>{submitLabel}</Button>
        </div>
      </div>
    </div>
  )
}