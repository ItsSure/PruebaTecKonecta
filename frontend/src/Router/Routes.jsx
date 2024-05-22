import {
  BrowserRouter as Router,
  Route,
  Routes as RouterRoutes,
} from 'react-router-dom'
import { Login } from '../pages/Login'
import { Empleados } from '../pages/Empleados'
import { Solicitudes } from '../pages/Solicitudes'
import MainLayout from '../layouts/MainLayout'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Registro } from '../pages/Registro'

const Routes = () => {
  const { rol } = useContext(AuthContext)
  return (
    <Router>
      <RouterRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Empleados />} />
          {rol == 'administrador' ? (
            <Route path="/solicitudes" element={<Solicitudes />} />
          ) : null}
        </Route>
      </RouterRoutes>
    </Router>
  )
}

export default Routes
