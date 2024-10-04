import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store/index";
import { signUpUser } from "../redux/store/actions/authActions";
import { SignUpFormValues } from "../model/model"; 

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      const response = await dispatch(signUpUser(values)).unwrap();
      if (response.success) {
        message.success("User registered successfully");
        navigate("/login");  // Redirect to login page after signUp
      }
    } catch (error: any) {
      if(error.response) {
                message.error(`Failed to register user: ${error.message.data.message}`);
              } else  if (error instanceof Error) {
                message.error('Failed to register user: ${error.message}');
              } else {
                message.error("Failed to register user");
              }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-14 max-w-60 mx-auto h-screen">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
          <Input placeholder="Enter your address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;

