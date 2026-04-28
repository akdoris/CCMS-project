import { NavLink } from 'react-router-dom'

type NavItem = {
  to: string
  label: string
  emoji: string
  badge?: number
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard',      emoji: '🏠' },
  { to: '/ideas',     label: 'Content Ideas',  emoji: '💡', badge: 2 },
  { to: '/schedule',  label: 'Schedule',       emoji: '📅' },
  { to: '/collabs',   label: 'Brand Collabs',  emoji: '🤝', badge: 1 },
  { to: '/analytics', label: 'Analytics',      emoji: '📊' },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0d0f14] flex flex-col z-50 shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-sm">
            ✦
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">CCMS</p>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">
              Creator Studio
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        <p className="text-[9px] font-semibold text-white/20 uppercase tracking-widest px-3 mb-2">
          Workspace
        </p>
        {navItems.map(({ to, label, emoji, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#c9a84c]/15 text-[#f0c96b]'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`
            }
          >
            <span className="text-base">{emoji}</span>
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="bg-[#e8614d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0d0f14]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}
          >
            AM
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Amina Khalid</p>
            <p className="text-white/30 text-[10px]">Content Creator</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
