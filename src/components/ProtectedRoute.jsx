import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

//"Guardia" de rutas: si no hay sesión, redirige al login
export default function ProtectedRoute() {
    //Usuario logueado = true, sino false
    const { isAuthenticated } = useAuth()
    //Contiene información de la ruta actual
    const location = useLocation()
    //Si no está autenticado
    if (!isAuthenticated) {
        //Si "isAuthenticated" es false se manda al usuario al login con replace
        return <Navigate to="/login" replace state={{ from: location }} />
    }
    return <Outlet /> //muestra la ruta hija (la página privada)
}