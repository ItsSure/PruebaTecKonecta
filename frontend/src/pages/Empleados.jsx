import {
  Collapse,
  Form,
  Input,
  Button,
  Card,
  Table,
  Pagination,
  DatePicker,
} from 'antd'
import { useEffect, useState } from 'react'
import { filtrar } from '../services/empleadosServices'
import { PlusCircleFilled } from '@ant-design/icons'
import { CrearEmpleados } from '../components/crearEmpleados'

export const Empleados = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtrartabla = async (values) => {
    setLoading(true)
    const { empleados } = await filtrar(values, currentPage)
    setData(empleados)
    setLoading(false)
  }

  useEffect(() => {
    filtrartabla()
  }, [currentPage])

  useEffect(() => {
    filtrartabla()
  }, [])

  const items = [
    {
      key: '1',
      label: 'Filtros',
      children: (
        <div>
          <Form layout='inline' onFinish={filtrartabla}>
            <Form.Item name="nombre">
              <Input placeholder="Nombre" />
            </Form.Item>
            <Form.Item name="fecha_ingreso">
              <DatePicker
                style={{
                  width: '100%',
                }}
                placeholder="Fecha de ingreso"
              />
            </Form.Item>
            <Form.Item name="salario">
              <Input placeholder="Salario" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Filtrar</Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Fecha ingreso',
      dataIndex: 'fecha_ingreso',
      key: 'fecha_ingreso',
    },
    {
      title: 'Salario',
      dataIndex: 'salario',
      key: 'salario',
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
      <Card
        style={{
          width: 620,
        }}
        actions={[
          <Button onClick={showModal} key="add">
            <PlusCircleFilled />
            <span style={{ marginLeft: 4 }}>Crear empleado</span>
          </Button>,
        ]}
        title="Empleados"
      >
        <Collapse
          style={{ width: '100%', marginBottom: '20px' }}
          items={items}
        />
        <Table
          dataSource={data?.empleados}
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
        <CrearEmpleados
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          filtrartabla={filtrartabla}
        />
      </Card>
    </div>
  )
}
