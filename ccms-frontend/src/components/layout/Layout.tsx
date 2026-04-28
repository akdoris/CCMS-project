import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f8f7f4]">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <Topbar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
