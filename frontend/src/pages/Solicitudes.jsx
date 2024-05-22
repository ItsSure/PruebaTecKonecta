import {
  Collapse,
  Form,
  Input,
  Button,
  Card,
  Table,
  Pagination,
  notification,
  InputNumber,
} from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { CrearSolicitud } from '../components/crearSolicitud'
import {
  filtrar,
  eliminarSolicitudService,
} from '../services/solicitudesService'

export const Solicitudes = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const filtrartabla = async (values) => {
    setLoading(true)
    const response = await filtrar(values, currentPage)
    setData(response)
    setLoading(false)
  }

  const openNotificationWithIcon = (resp) => {
    api['success']({
      message: 'Éxito!',
      description: resp.mensaje,
    })
  }

  const eliminarSolicitud = (id) => {
    eliminarSolicitudService(id)
      .then((response) => {
        openNotificationWithIcon(response)
        filtrartabla()
      })
      .catch((error) => {
        console.error('Error eliminando la solicitud:', error)
      })
  }

  useEffect(() => {
    filtrartabla()
  }, [currentPage])

  useEffect(() => {
    filtrartabla()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Resumen',
      dataIndex: 'resumen',
      key: 'resumen',
    },
    {
      title: 'ID Empleado',
      dataIndex: 'Empleado',
      key: 'Empleado',
      render: (_, row) => row?.Empleado?.id,
    },
    {
      title: 'Nombre del empleado',
      dataIndex: 'nombreEmpleado',
      key: 'nombreEmpleado',
      render: (_, row) => row?.Empleado?.nombre,
    },
    {
      title: 'Opciones',
      dataIndex: 'opciones',
      key: 'opciones',
      render: (_, row) => (
        <Button
          onClick={() => {
            eliminarSolicitud(row.id)
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ]

  const items = [
    {
      key: '1',
      label: 'Filtros',
      children: (
        <div>
          <Form layout="inline" onFinish={filtrartabla}>
            <Form.Item name="codigo">
              <InputNumber
                style={{
                  width: '100%',
                }}
                placeholder="Código"
              />
            </Form.Item>
            <Form.Item name="descripcion">
              <Input
                style={{
                  width: '100%',
                }}
                placeholder="Descripción"
              />
            </Form.Item>
            <Form.Item name="resumen">
              <Input
                style={{
                  width: '100%',
                }}
                placeholder="Resumen"
              />
            </Form.Item>
            <Form.Item name="id_empleado">
              <InputNumber
                style={{
                  width: '100%',
                }}
                placeholder="ID Empleado"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Filtrar</Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        width: '100%',
      }}
    >
      {contextHolder}
      <Card
        style={{
          width: 820,
        }}
        actions={[
          <Button onClick={showModal} key="add">
            <PlusCircleFilled />
            <span style={{ marginLeft: 4 }}>Crear solicitud</span>
          </Button>,
        ]}
        title="Solicitudes"
      >
        <Collapse
          style={{ width: '100%', marginBottom: '20px' }}
          items={items}
        />
        <Table
          dataSource={data?.solicitudes}
          pagination={false}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
        <Pagination
          style={{ marginTop: 10 }}
          current={currentPage}
          pageSize={10}
          total={data?.totalItems}
          onChange={(page) => {
            setCurrentPage(page)
          }}
        />
        <CrearSolicitud
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          filtrartabla={filtrartabla}
        />
      </Card>
    </div>
  )
}
