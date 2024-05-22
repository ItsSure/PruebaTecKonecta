import { useContext } from 'react'
import { Button, Form, Input, Card } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { AuthContext } from '../auth/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export const Login = () => {
  const { login } = useContext(AuthContext)
  const nav = useNavigate()

  const onFinish = async (values) => {
    const { password, username } = values
    await login(username, password)
    nav('/', { replace: true })
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
      <Card style={{ width: 300 }} title="Inicio sesión">
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
              Iniciar sesión
            </Button>
            Or <Link to="/register">Registrate!</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
