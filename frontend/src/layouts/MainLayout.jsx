import { Layout, Menu, Button } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import { Link, Outlet, Navigate } from 'react-router-dom'
import Sider from 'antd/es/layout/Sider'
import { useState, useContext } from 'react'
import { DesktopOutlined } from '@ant-design/icons'
import { AuthContext } from '../auth/AuthContext'

function getItem(label, key, icon, children) {
  return { key, icon, children, label }
}

const items = [
  getItem(<Link to="/">Empleados</Link>, '1', <DesktopOutlined />),
  getItem(<Link to="/solicitudes">Solicitudes</Link>, '2', <DesktopOutlined />),
]

const items2 = [
  getItem(<Link to="/">Empleados</Link>, '1', <DesktopOutlined />),
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { isAuthenticated, rol, logout } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width="15%"
        style={{ background: '#0a0a0a' }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={rol == 'administrador' ? items : items2}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#0a0a0a', padding: 0 }}>
          <div
            style={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            Test Konecta
            <Button danger onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
