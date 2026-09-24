import { createContext, useContext, useState } from 'react'

//Creamos el contexto (una "caja" global para compartir la sesión)
//null = por defecto no hay usuario activo
const AuthContext = createContext(null)

//Usuarios de prueba
const USUARIOS = [
    { usuario: 'admin', clave: '123456', nombre: 'Alonso Admin' },
    { usuario: 'alumno', clave: 'alumno123', nombre: 'Luis Alumno' },
]

//El Provider envuelve la app y expone: user, isAuthenticated, login, logout
export function AuthProvider({ children }) {
    //Al iniciar, leemos la sesión guardada (para no perderla al recargar)
    const [user, setUser] = useState(() => {
        const guardado = localStorage.getItem('user')
        return guardado ? JSON.parse(guardado) : null
    })

    const login = (usuario, clave) => {
        //Busca si existe un usuario con esa contraseña
        const encontrado = USUARIOS.find(
            (u) => u.usuario === usuario && u.clave === clave
        )

        //Si no existe devuelve false
        if (!encontrado) return false

        //Si existe crea un objeto con la información necesaria
        const datos = { usuario: encontrado.usuario, nombre: encontrado.nombre }
        setUser(datos)
        localStorage.setItem('user', JSON.stringify(datos))
        return true
    }

    //Cerrar sesión
    const logout = () => {
        setUser(null)
        //Elimina la sesión guardada en el navegador
        localStorage.removeItem('user')
    }

    return (
        //user = información del usuario actual
        //isAuthenticated = true si hay usuario, false si no
        //login = función para iniciar sesión
        //logout = función para cerrar sesión
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

//Hook personalizado para usar la sesión en cualquier componente
export const useAuth = () => useContext(AuthContext)