import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
    const { user, logout } = useAuth()
    return (
        <div className="page">
            <header className="topbar">
                <strong>Mi App Segura</strong>
                <button onClick={logout}>Cerrar sesión</button>
            </header>
            <main className="card">
                <h1>Bienvenido, {user.nombre}</h1>
                <p>Esta página es privada: solo la ves porque iniciaste sesión :v</p>
            </main>
        </div>
    )
}