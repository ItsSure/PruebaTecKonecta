import { createContext, useState } from 'react'
import { authService } from '../services/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [rol, setRol] = useState()

  const login = async (correo, contrasena) => {
    const response = await authService({
      correo: correo,
      contrasena: contrasena,
    })
    Cookies.set('token', response.token.token, { expires: 7, path: '/' })
    setRol(response.token.rol)
    setIsAuthenticated(true)
  }

  const verify = () => {
    const token = Cookies.get('token')
    console.log(token)
  }

  const logout = () => {
    setIsAuthenticated(false)
    Cookies.remove('token')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, verify, rol }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
