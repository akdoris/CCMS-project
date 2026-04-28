import { useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ideas':     'Content Ideas',
  '/schedule':  'Schedule',
  '/collabs':   'Brand Collaborations',
  '/analytics': 'Analytics',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = titles[pathname] ?? 'CCMS'

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 h-16 px-8 flex items-center justify-between shadow-sm">
      <h1 className="font-bold text-lg text-[#0d0f14]">{title}</h1>
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
          🔍
        </button>
        {/* Bell with dot */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all">
          🔔
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#e8614d] rounded-full" />
        </button>
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0d0f14]"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #2cc4a0)' }}
        >
          AM
        </div>
      </div>
    </header>
  )
}
