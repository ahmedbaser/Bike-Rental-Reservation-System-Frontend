import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const ContactUs: React.FC = () => {
  const [form] = Form.useForm();
  const [messageSent, setMessageSent] = useState(false);

  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values);
    setMessageSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      {messageSent ? (
        <div className="text-lg text-green-600">Your message has been sent successfully!</div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input placeholder="Your email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea rows={4} placeholder="Your message" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ContactUs;
