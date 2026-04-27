import { cn } from '../../lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
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
        className={cn(
          'w-full px-3.5 py-2.5 border border-black/10 rounded-xl text-sm text-[#0d0f14] bg-white transition-all appearance-none cursor-pointer',
          'focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10',
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}