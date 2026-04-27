import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
        className={cn(
          'w-full px-3.5 py-2.5 border border-black/10 rounded-xl text-sm text-[#0d0f14] bg-white transition-all',
          'focus:outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10',
          'placeholder:text-gray-300',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-100',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}