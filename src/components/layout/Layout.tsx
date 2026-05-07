import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar  from './Topbar'
import { useSidebarStore } from '../../store/useSidebarStore'

export default function Layout() {
  const { isOpen, isCollapsed, close } = useSidebarStore()
  const marginLeft = isCollapsed ? 'lg:ml-16' : 'lg:ml-64'

  return (
    <div className="flex min-h-screen bg-[#f8f7f4]">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={close}
        />
      )}

      <Sidebar />

      <div className={`flex flex-col flex-1 transition-all duration-300 ${marginLeft} min-w-0`}>
        <Topbar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}