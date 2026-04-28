import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useIdeasStore }    from './store/useIdeasStore'
import { useScheduleStore } from './store/useScheduleStore'
import { useCollabStore }   from './store/useCollabStore'
import { SEED_IDEAS, SEED_POSTS, SEED_COLLABS } from './lib/seedData'
import Layout    from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Ideas     from './pages/Ideas'
import Schedule  from './pages/Schedule'
import Collabs   from './pages/Collabs'
import Analytics from './pages/Analytics'

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ideas"     element={<Ideas />}     />
        <Route path="schedule"  element={<Schedule />}  />
        <Route path="collabs"   element={<Collabs />}   />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  )
}
