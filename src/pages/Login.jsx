import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [usuario, setUsuario] = useState('')
    const [clave, setClave] = useState('')
    const [error, setError] = useState('')
    const destino = location.state?.from?.pathname || '/dashboard'
    
    // Si ya inició sesión, no tiene sentido mostrar el login
    if (isAuthenticated) return <Navigate to={destino} replace />
    const handleSubmit = (e) => {
        e.preventDefault()
        if (login(usuario, clave)) {
            navigate(destino, { replace: true })
        } else {
            setError('Usuario o contraseña incorrectos')
        }
    }
    return (
        <div className="login-page">
            <form className="card" onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <label>
                    Usuario
                    <input value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                </label>
                <label>
                    Contraseña
                    <input type="password" value={clave}
                        onChange={(e) => setClave(e.target.value)} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit">Ingresar</button>
                <small>Prueba: admin / 123456</small>
            </form>
        </div>
    )
}