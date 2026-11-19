import { Route, Routes } from 'react-router-dom'
import PageShell from './components/layout/PageShell'
import ScrollManager from './components/layout/ScrollManager'
import Home from './pages/Home'
import CaseStudyPlatform from './pages/CaseStudyPlatform'
import CaseStudyLunchOrder from './pages/CaseStudyLunchOrder'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <PageShell>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/ba3-data-platform" element={<CaseStudyPlatform />} />
        <Route path="/work/lunch-order" element={<CaseStudyLunchOrder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageShell>
  )
}
