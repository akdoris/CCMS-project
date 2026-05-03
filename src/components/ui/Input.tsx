import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0d0f14] bg-white transition-all',
          'border border-gray-200 focus:outline-none focus:border-[#c9a84c]',
          'placeholder:text-gray-300',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
