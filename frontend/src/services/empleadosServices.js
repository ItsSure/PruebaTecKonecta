const url = 'http://localhost:3000/api/v1/empleados/'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
const token = Cookies.get('token')

export const filtrar = async (data, currentPage) => {
  const request = {
    filtro: {
      fecha_ingreso: data?.fecha_ingreso
        ? dayjs(data?.fecha_ingreso).format('YYYY-MM-DD')
        : '',
      nombre: data?.nombre,
      salario: data?.salario,
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

export const crearEmpleado = async (data) => {
  const request = {
    nombre: data.nombre,
    fecha_ingreso: dayjs(data.fecha_ingreso).format('YYYY-MM-DD'),
    salario: data.salario,
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
