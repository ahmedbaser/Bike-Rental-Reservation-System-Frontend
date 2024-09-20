import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/index'; 
import { updateUserProfile } from '../../redux/store/actions/userActions'; 
import { Form, Input, Button, message } from 'antd';
import { UserProfileFormValues } from '../../model/model';


const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.auth);
    const user = auth.user;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      console.log('User data:', user);
        if(user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                 
            });
        }
    }, [user, form]);

    const onFinish = async(values: UserProfileFormValues) => {
        setLoading(true);
     try{
            await dispatch(updateUserProfile(values));
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg  mt-8 mb-14">
      <h2 className="text-2xl font-bold mb-4">Welcome {user?.name}!</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
       >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default ProfilePage;
