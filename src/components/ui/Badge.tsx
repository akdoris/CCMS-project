import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type BadgeVariant =
  | 'draft' | 'inprogress' | 'published'
  | 'pending' | 'active' | 'completed' | 'cancelled'
  | 'youtube' | 'instagram' | 'tiktok' | 'twitter'

const variants: Record<BadgeVariant, string> = {
  draft:      'bg-gray-100 text-gray-500',
  inprogress: 'bg-amber-50 text-amber-700',
  published:  'bg-emerald-50 text-emerald-700',
  pending:    'bg-amber-50 text-amber-700',
  active:     'bg-violet-50 text-violet-700',
  completed:  'bg-emerald-50 text-emerald-700',
  cancelled:  'bg-red-50 text-red-600',
  youtube:    'bg-red-50 text-red-600',
  instagram:  'bg-pink-50 text-pink-600',
  tiktok:     'bg-gray-100 text-gray-700',
  twitter:    'bg-sky-50 text-sky-600',
}

type BadgeProps = {
  variant: BadgeVariant
  children: ReactNode
  className?: string
}

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full',
        'text-[11px] font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
