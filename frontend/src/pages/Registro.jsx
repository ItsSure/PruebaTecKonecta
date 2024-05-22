import { Button, Form, Input, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { registerService } from '../services/auth'

export const Registro = () => {
  const nav = useNavigate()

  const onFinish = async (values) => {
    const { password, username, correo } = values
    await registerService({
      correo: correo,
      contrasena: password,
      nombre: username,
    })
    nav('/login', { replace: true })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Card style={{ width: 300 }} title="Registrarse">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Introduce tu nombre!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Nombre"
            />
          </Form.Item>
          <Form.Item
            name="correo"
            rules={[
              {
                required: true,
                message: 'Introduce tu correo!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Correo"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Introduce tu contraseña!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button"
              style={{ marginRight: '10px' }}
            >
              Registrarse
            </Button>
            Or <Link to="/login">Inicia sesión!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
