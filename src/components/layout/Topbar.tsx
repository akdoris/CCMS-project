import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate }    from 'react-router-dom'
import { toast }                       from 'react-hot-toast'
import { useSidebarStore }             from '../../store/useSidebarStore'

const titles: Record<string, string> = {
  '/home':          'Home',
  '/dashboard':     'Dashboard',
  '/ideas':         'Content Ideas',
  '/schedule':      'Schedule',
  '/collabs':       'Brand Collaborations',
  '/analytics':     'Analytics',
  '/profile':       'My Profile',
  '/notifications': 'Notifications',
  '/settings':      'Settings',
  '/help':          'Help & Support',
}

const NOTIFICATIONS = [
  { icon: '⚠️', text: 'LumiLight deadline in 3 days',   time: '5m ago',    unread: true  },
  { icon: '✅', text: 'NovaEdit collab completed',        time: '1h ago',    unread: true  },
  { icon: '📅', text: 'Morning Routine Vlog scheduled',  time: '2h ago',    unread: false },
  { icon: '🤝', text: 'New deal from UrbanBrew Coffee',  time: 'Yesterday', unread: false },
]

export default function Topbar() {
  const { pathname }          = useLocation()
  const navigate              = useNavigate()
  const { toggle }            = useSidebarStore()
  const title                 = titles[pathname] ?? 'CCMS'

  const [showSearch,  setShowSearch]  = useState(false)
  const [showBell,    setShowBell]    = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchVal,   setSearchVal]   = useState('')
  const [notifs,      setNotifs]      = useState(NOTIFICATIONS)

  const searchRef  = useRef<HTMLDivElement>(null)
  const bellRef    = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifs.filter((n) => n.unread).length

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (searchRef.current  && !searchRef.current.contains(e.target as Node))  setShowSearch(false)
      if (bellRef.current    && !bellRef.current.contains(e.target as Node))    setShowBell(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  function markAllRead() {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })))
    toast.success('All notifications marked as read')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 h-16 px-4 md:px-6 flex items-center justify-between shadow-sm flex-shrink-0">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className="block h-0.5 bg-current rounded" />
            <span className="block h-0.5 bg-current rounded" />
            <span className="block h-0.5 bg-current rounded" />
          </div>
        </button>
        <h1 className="font-bold text-base md:text-lg text-[#0d0f14]">{title}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">

        {/* Search */}
        <div ref={searchRef} className="relative">
          <button onClick={() => { setShowSearch(!showSearch); setShowBell(false); setShowProfile(false) }}
            className={`p-2 rounded-xl transition-all text-base ${showSearch ? 'bg-[#c9a84c]/10 text-[#c9a84c]' : 'text-gray-400 hover:bg-gray-100'}`}>
            🔍
          </button>
          {showSearch && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">
              <input autoFocus
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a84c] bg-gray-50"
                placeholder="Search anything…"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <div className="mt-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider px-2 pb-1">Quick Navigate</p>
                {[
                  { label: 'Home',          path: '/home',      icon: '🏠' },
                  { label: 'Dashboard',     path: '/dashboard', icon: '📊' },
                  { label: 'Content Ideas', path: '/ideas',     icon: '💡' },
                  { label: 'Schedule',      path: '/schedule',  icon: '📅' },
                  { label: 'Brand Collabs', path: '/collabs',   icon: '🤝' },
                  { label: 'My Profile',    path: '/profile',   icon: '👤' },
                ].filter(i => !searchVal || i.label.toLowerCase().includes(searchVal.toLowerCase()))
                  .map((item) => (
                    <button key={item.path}
                      onClick={() => { navigate(item.path); setShowSearch(false); setSearchVal('') }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-gray-50 text-gray-600 transition-all flex items-center gap-2">
                      <span>{item.icon}</span>{item.label}
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Bell */}
        <div ref={bellRef} className="relative">
          <button onClick={() => { setShowBell(!showBell); setShowSearch(false); setShowProfile(false) }}
            className={`relative p-2 rounded-xl transition-all text-base ${showBell ? 'bg-[#c9a84c]/10' : 'text-gray-400 hover:bg-gray-100'}`}>
            🔔
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#e8614d] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showBell && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <p className="text-xs text-gray-400">{unreadCount} unread</p>
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-[#c9a84c] font-semibold hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {notifs.map((n, i) => (
                  <div key={i}
                    onClick={() => setNotifs(notifs.map((item, idx) => idx === i ? { ...item, unread: false } : item))}
                    className={`flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 ${n.unread ? 'bg-amber-50/40' : ''}`}>
                    <span className="text-lg mt-0.5">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0d0f14] leading-snug">{n.text}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-[#c9a84c] rounded-full mt-1.5 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-gray-100 text-center">
                <button onClick={() => { navigate('/notifications'); setShowBell(false) }}
                  className="text-xs text-[#c9a84c] font-semibold hover:underline">
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div ref={profileRef} className="relative">
          <button onClick={() => { setShowProfile(!showProfile); setShowSearch(false); setShowBell(false) }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-all">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0d0f14]"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}>
              AM
            </div>
            <span className="hidden md:block text-sm font-medium text-[#0d0f14]">Amina</span>
            <span className="hidden md:block text-gray-400 text-xs">▾</span>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0d0f14]"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}>
                    AM
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#0d0f14]">Amina Khalid</p>
                    <p className="text-xs text-gray-400">Content Creator</p>
                  </div>
                </div>
              </div>
              <div className="py-1.5">
                {[
                  { icon: '👤', label: 'My Profile',    path: '/profile'       },
                  { icon: '🔔', label: 'Notifications', path: '/notifications' },
                  { icon: '⚙️', label: 'Settings',      path: '/settings'      },
                  { icon: '💬', label: 'Help & Support', path: '/help'         },
                ].map((item) => (
                  <button key={item.path}
                    onClick={() => { navigate(item.path); setShowProfile(false) }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-all">
                    <span>{item.icon}</span>{item.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 py-1.5">
                <button onClick={() => { navigate('/login'); toast.success('Logged out') }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}