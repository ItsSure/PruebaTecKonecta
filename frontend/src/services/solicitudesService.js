const url = 'http://localhost:3000/api/v1/solicitudes/'
import Cookies from 'js-cookie'
const token = Cookies.get('token')

export const filtrar = async (data, currentPage) => {
  const request = {
    filtro: {
      codigo: data?.codigo,
      descripcion: data?.descripcion,
      resumen: data?.resumen,
      id_empleado: data?.id_empleado,
    },
    opciones: { page: currentPage },
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(request),
  }

  try {
    const response = await fetch(`${url}filtrar`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const crearSolicitud = async (data) => {
  const request = {
    codigo: data.codigo,
    descripcion: data.descripcion,
    resumen: data.resumen,
    id_empleado: data.id_empleado,
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(request),
  }

  try {
    const response = await fetch(`${url}`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const eliminarSolicitudService = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }

  try {
    const response = await fetch(`${url}/${id}`, options)
    if (!response.ok) {
      throw new Error('Error en la solicitud')
    }
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
