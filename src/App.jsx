import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Ruta pública*/}
        <Route path="/login" element={<Login />} />
        {/*Rutas privadas: todas las que estén dentro de ProtectedRoute*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/*Cualquier otra ruta -> dashboard (o login si no hay sesión)*/}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}