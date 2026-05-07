import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useIdeasStore }    from './store/useIdeasStore'
import { useScheduleStore } from './store/useScheduleStore'
import { useCollabStore }   from './store/useCollabStore'
import { SEED_IDEAS, SEED_POSTS, SEED_COLLABS } from './lib/seedData'
import Layout    from './components/layout/Layout'
import Home          from './pages/Home'
import Dashboard from './pages/Dashboard'
import Ideas     from './pages/Ideas'
import Schedule  from './pages/Schedule'
import Collabs   from './pages/Collabs'
import Analytics from './pages/Analytics'
import Profile       from './pages/Profile'
import Notifications from './pages/Notifications'
import Settings      from './pages/Settings'
import Help          from './pages/Help'
import Login     from './pages/Login'
import Signup    from './pages/Signup'

export default function App() {
  const setIdeas   = useIdeasStore((s) => s.setIdeas)
  const setPosts   = useScheduleStore((s) => s.setPosts)
  const setCollabs = useCollabStore((s) => s.setCollabs)

  useEffect(() => {
    setIdeas(SEED_IDEAS)
    setPosts(SEED_POSTS)
    setCollabs(SEED_COLLABS)
  }, [setIdeas, setPosts, setCollabs])

  return (
      <Routes>
        {/* Public routes — no sidebar */}
        <Route path="/home"   element={<Home />}   />
        <Route path="/login"  element={<Login />}  />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes — with sidebar layout */}
        <Route path="/" element={<Layout />}>
          <Route index     element={<Navigate to="/home" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ideas"     element={<Ideas />}     />
          <Route path="schedule"  element={<Schedule />}  />
          <Route path="collabs"   element={<Collabs />}   />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile"       element={<Profile />}       />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings"      element={<Settings />}      />
          <Route path="help"          element={<Help />}          />
        </Route>

        {/* Default — redirect to login */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
  )
}