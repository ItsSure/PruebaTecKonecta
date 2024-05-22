import { useState } from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  notification,
} from 'antd'
import { crearSolicitud } from '../services/solicitudesService'

export const CrearSolicitud = ({ isModalOpen, setIsModalOpen, filtrartabla }) => {
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
    const response = await crearSolicitud(datos)
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
      title="Crear Solicitud"
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
      </Form>
    </Modal>
  )
}
