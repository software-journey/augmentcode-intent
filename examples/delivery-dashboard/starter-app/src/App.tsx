import './App.css'

import { Route, Routes } from 'react-router-dom'

import { DashboardPage } from './routes/DashboardPage'
import { LoginPage } from './routes/LoginPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

export default App