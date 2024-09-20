import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../redux/store/actions/authActions";
import { AppDispatch } from "../redux/store/index";
import { SignUpFormValues, SignUpResponse } from "../model/model";

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: SignUpFormValues) => {
    setLoading(true);

    try {
      const response = await dispatch(signupUser(values)).unwrap() as SignUpResponse;
      if(response.success) {
        message.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      if(error instanceof Error) {
        message.error(`Failed to register user: ${error.message}`);
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
        <Form.Item label='Name' name='name' rules={[{required:true,}]}>
          <Input placeholder="Enter your name"/>
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[{required:true, type: 'email'}]}>
          <Input placeholder="Enter your email"/>
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{required:true}]}>
          <Input placeholder="Enter your password"/>
        </Form.Item>
        <Form.Item label='Phone' name='phone' rules={[{required:true}]}>
          <Input placeholder="Enter your phone number"/>
        </Form.Item>
        <Form.Item label='Address' name='address' rules={[{required:true}]}>
          <Input placeholder="Enter your address"/>
        </Form.Item>
        <Form.Item label='Role' name='role' rules={[{required:true}]}>
          <Input placeholder="Enter your role"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Sign Up</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
