const url = 'http://localhost:3000/api/v1/login/'

export const authService = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(`${url}login`, options)
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

export const registerService = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  try {
    const response = await fetch(`${url}registro`, options)
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
