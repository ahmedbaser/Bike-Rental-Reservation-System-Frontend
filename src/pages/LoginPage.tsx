import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store/index";
import { LoginResponse, loginUser } from "../redux/store/actions/authActions";
import { LoginFormValues } from "../model/model";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async(values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await dispatch(loginUser(values)).unwrap() as LoginResponse;
      if(response.success) {
        localStorage.setItem('token', response.token); // Storing the token
        console.log('Token stored in localStorage:', localStorage.getItem('token'));
        message.success("User logged in successfully");
        navigate("/dashboard");
      } 
    } catch (error: any) {
      if(error.response) {
        message.error(`Failed to login: ${error.response.data.message}`);
       } else if(error instanceof Error) {
        message.error(`Failed to login: ${error.message}`);
    } else {
      message.error('Failed to login: An unknown error occurred');
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container max-w-64 mx-auto mt-10">
        <Form onFinish={onFinish} layout="vertical">
            <Form.Item label="Email" name="email" rules={[{required: true, type: 'email'}]}>
                <Input placeholder="Enter your email"/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required: true}]}>
                <Input placeholder="Enter your password"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                   Login
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
};

export default LoginPage;


