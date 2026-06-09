"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Typography } from "antd";

import { useLogin } from "@/features/auth/model/hooks";
import type { LoginFields } from "@/features/auth/ui/auth-form";

const { Title, Text } = Typography;

export function LoginForm() {
  const [form] = Form.useForm<LoginFields>();
  const loginMutation = useLogin();
  const { message } = App.useApp();

  const handleFinish = async (values: LoginFields) => {
    try {
      await loginMutation.mutateAsync(values);
      message.success("Welcome back!");
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Login failed");
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-md">
        <div className="mb-8 text-center">
          <Title level={3} className="!mb-1">
            Admin Panel
          </Title>
          <Text type="secondary">Sign in to manage cars and categories</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
          <Form.Item
            name="login"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@example.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loginMutation.isPending}
          >
            Sign In
          </Button>
        </Form>
      </Card>
    </div>
  );
}
