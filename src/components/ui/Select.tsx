import { clsx } from 'clsx'
import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: { value: string; label: string }[]
}

export default function Select({ label, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        className={clsx(
          'w-full px-3.5 py-2.5 rounded-xl text-sm text-[#0d0f14] bg-white transition-all',
          'border border-gray-200 focus:outline-none focus:border-[#c9a84c]',
          'appearance-none cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
