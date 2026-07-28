import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '@/pages/landing'
import DisplayPage from '@/pages/display'
import NotFoundPage from '@/pages/not-found'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/display" element={<DisplayPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
