import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import SchedulePage from '@/pages/SchedulePage'
import SignupPage from '@/pages/SignupPage'
import AdminPage from '@/pages/AdminPage'
import MembersPage from '@/pages/MembersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SchedulePage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="members" element={<MembersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
