import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/index";
import { Button, Form, Input, message } from "antd";
import { updateAdminProfile } from "../../redux/store/actions/adminActions";
import { UserProfileFormValues } from "../../model/model";

const AdminProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const admin = auth.user
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);



useEffect(() => {
  console.log('User data:', admin);
    if(admin) {
        form.setFieldsValue({
            name: admin.name,
            email: admin.email,
            phone: admin.phone,
            address: admin.address,
             
        });
    }
}, [admin, form]);


const onFinish = async(values: UserProfileFormValues) => {
  setLoading(true);
try{
      await dispatch(updateAdminProfile(values));
      message.success('Profile updated successfully')
  } catch(error) {
      if(error instanceof Error) {
          message.error(`Failed to update profile:${error}`);
  } 
} finally {
  setLoading(false);
}

}


 return (
    <div className="container mx-auto p-6 mb-14">
    
    <h2 className="text-2xl font-bold mb-4">Welcome {admin?.name}!</h2>

    <Form
      form={form}
      layout="vertical"
      
      onFinish={onFinish}
      className="max-w-lg"
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  </div>
 );
};


export default AdminProfilePage;