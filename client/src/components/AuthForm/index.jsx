import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

export default function AuthForm({
  buttonText,
  onSubmit,
  title,
  fields,
  errors,
}) {
  const { status } = useSelector((state) => state.user);

  return (
    <div className="flex flex-row h-screen items-center justify-center">
      <Form
        onFinish={onSubmit}
        autoComplete="off"
        className="w-1/3 h-1/3 p-8 border-2 rounded-2xl"
      >
        <div className="text-2xl font-semibold text-center mb-8">{title}</div>
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            rules={field.rules}
            validateStatus={field.validateStatus}
            help={field.help}
          >
            {field.type === "password" ? (
              <Input.Password
                placeholder={field.placeholder}
                prefix={<LockOutlined />}
                size="large"
                className="p-3 space-x-3"
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                prefix={<UserOutlined />}
                size="large"
                className="p-3 space-x-3"
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-full my-2 bg-blue-500 text-white"
            size="large"
            loading={status === "pending"}
  
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
