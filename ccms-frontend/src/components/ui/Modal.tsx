import type { ReactNode } from 'react'
import Button from './Button'

type ModalProps = {
  title: string
  onClose: () => void
  onSubmit: () => void
  submitLabel?: string
  loading?: boolean
  children: ReactNode
}

export default function Modal({
  title,
  onClose,
  onSubmit,
  submitLabel = 'Save',
  loading = false,
  children,
}: ModalProps) {
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-gray-100">
          <h2 className="font-bold text-base text-[#0d0f14]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">{children}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-7 pb-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gold" onClick={onSubmit} loading={loading}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
