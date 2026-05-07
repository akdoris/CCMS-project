import { NavLink } from 'react-router-dom'
import { useSidebarStore } from '../../store/useSidebarStore'

type NavItem = {
  to: string
  label: string
  emoji: string
  badge?: number
}

const navItems: NavItem[] = [
  { to: '/home',      label: 'Home',          emoji: '🏠' },
  { to: '/dashboard', label: 'Dashboard',     emoji: '📊' },
  { to: '/ideas',     label: 'Content Ideas', emoji: '💡', badge: 2 },
  { to: '/schedule',  label: 'Schedule',      emoji: '📅' },
  { to: '/collabs',   label: 'Brand Collabs', emoji: '🤝', badge: 1 },
  { to: '/analytics', label: 'Analytics',     emoji: '📈' },
]

const bottomItems: NavItem[] = [
  { to: '/profile',       label: 'My Profile',   emoji: '👤' },
  { to: '/notifications', label: 'Notifications', emoji: '🔔' },
  { to: '/settings',      label: 'Settings',     emoji: '⚙️' },
  { to: '/help',          label: 'Help & Support', emoji: '💬' },
]

export default function Sidebar() {
  const { isOpen, isCollapsed, close, toggleCollapse } = useSidebarStore()

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64'

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-[#0d0f14] flex flex-col z-50 shadow-2xl
        transition-all duration-300 ease-in-out
        ${sidebarWidth}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      {/* Logo + Collapse Toggle */}
      <div className={`flex items-center border-b border-white/5 h-16 flex-shrink-0
        ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-sm flex-shrink-0">
              ✦
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">CCMS</p>
              <p className="text-[9px] text-white/30 uppercase tracking-widest">Creator Studio</p>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center text-[#0d0f14] font-bold text-sm">
            ✦
          </div>
        )}

        {/* Collapse toggle — desktop only */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition-all items-center justify-center flex-shrink-0"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <div className="flex flex-col gap-[3px]">
            <span className="block w-3.5 h-[2px] bg-white/40 rounded" />
            <span className="block w-3.5 h-[2px] bg-white/40 rounded" />
            <span className="block w-3.5 h-[2px] bg-white/40 rounded" />
          </div>
        </button>

        {/* Close — mobile only */}
        {!isCollapsed && (
          <button
            onClick={close}
            className="lg:hidden text-white/40 hover:text-white p-1 rounded-lg transition-all"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
        {!isCollapsed && (
          <p className="text-[9px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-2">
            Workspace
          </p>
        )}

        {navItems.map(({ to, label, emoji, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            title={isCollapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-xl text-sm font-medium transition-all duration-150
               ${isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'}
               ${isActive
                 ? 'bg-[#c9a84c]/15 text-[#f0c96b]'
                 : 'text-white/50 hover:text-white/80 hover:bg-white/5'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-base flex-shrink-0 ${isActive ? 'filter-none' : ''}`}>
                  {emoji}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{label}</span>
                    {badge && (
                      <span className="bg-[#e8614d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {badge}
                      </span>
                    )}
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Divider */}
        <div className="my-3 border-t border-white/5" />

        {!isCollapsed && (
          <p className="text-[9px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-2">
            Account
          </p>
        )}

        {bottomItems.map(({ to, label, emoji }) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            title={isCollapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-xl text-sm font-medium transition-all duration-150
               ${isCollapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'}
               ${isActive
                 ? 'bg-[#c9a84c]/15 text-[#f0c96b]'
                 : 'text-white/50 hover:text-white/80 hover:bg-white/5'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="text-base flex-shrink-0">{emoji}</span>
                {!isCollapsed && (
                  <span className="flex-1 truncate">{label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      {!isCollapsed && (
        <div className="px-2 py-3 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl bg-white/5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0d0f14] flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}
            >
              AM
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">Amina Khalid</p>
              <p className="text-white/30 text-[10px]">Content Creator</p>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="px-2 py-3 border-t border-white/5 flex justify-center flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0d0f14]"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}
          >
            AM
          </div>
        </div>
      )}
    </aside>
  )
}