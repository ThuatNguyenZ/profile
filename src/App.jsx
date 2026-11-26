import { Route, Routes } from 'react-router-dom'
import PageShell from './components/layout/PageShell'
import ScrollManager from './components/layout/ScrollManager'
import RouteTransition, { RouteSweep } from './components/layout/RouteTransition'
import Home from './pages/Home'
import CaseStudyPlatform from './pages/CaseStudyPlatform'
import CaseStudyLunchOrder from './pages/CaseStudyLunchOrder'
import About from './pages/About'
import NotFound from './pages/NotFound'

function AppRoutes(location) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/work/ba3-data-platform" element={<CaseStudyPlatform />} />
      <Route path="/work/lunch-order" element={<CaseStudyLunchOrder />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <PageShell>
      <RouteSweep />
      <ScrollManager />
      <RouteTransition>{AppRoutes}</RouteTransition>
    </PageShell>
  )
}
