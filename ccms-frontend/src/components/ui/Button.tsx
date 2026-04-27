import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
  children: React.ReactNode
}

const variants = {
  primary: 'bg-[#0d0f14] text-white hover:bg-[#1c1f2a]',
  gold:    'bg-[#c9a84c] text-[#0d0f14] font-semibold hover:bg-[#f0c96b]',
  outline: 'border border-black/10 text-gray-700 hover:bg-gray-50',
  ghost:   'text-gray-500 hover:text-gray-800 hover:bg-gray-100',
  danger:  'bg-red-50 text-red-600 hover:bg-red-100',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
}

export default function Button({
  variant = 'primary', size = 'md',
  loading, children, className, disabled, ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 size={13} className="animate-spin" />}
      {children}
    </button>
  )
}