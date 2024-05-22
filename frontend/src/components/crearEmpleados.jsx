import { useState } from 'react'
import {
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  notification,
} from 'antd'
import { crearEmpleado } from '../services/empleadosServices'

export const CrearEmpleados = ({
  isModalOpen,
  setIsModalOpen,
  filtrartabla,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (resp) => {
    api['success']({
      message: 'Éxito!',
      description: resp.mensaje,
    })
  }

  const handleOk = async () => {
    setLoading(true)
    const datos = form.getFieldsValue()
    const response = await crearEmpleado(datos)
    openNotificationWithIcon(response)
    setLoading(false)
    form.resetFields()
    filtrartabla()
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <Modal
      title="Crear empleado"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button danger onClick={handleCancel} key="cancel">
          Cancelar
        </Button>,
        <Button loading={loading} onClick={handleOk} key="ok">
          Crear
        </Button>,
      ]}
      width={300}
    >
      {contextHolder}
      <Form
        form={form}
        name="basic"
        style={{
          width: '100%',
          marginTop: 20,
        }}
        autoComplete="false"
      >
        <Form.Item name="nombre">
          <Input
            style={{
              width: '100%',
            }}
            placeholder="Nombre"
          />
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
          <InputNumber
            style={{
              width: '100%',
            }}
            placeholder="Salario"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
