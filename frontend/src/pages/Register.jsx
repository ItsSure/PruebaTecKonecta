import { Form, Input, Button } from "antd";
import { useAuth } from "../auth/AuthContext";

export const Register = () => {
  const { login } = useAuth();

  const onFinish = () => {
    login();
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
