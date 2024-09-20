import { Button, Form, Input, message, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBike, fetchBikes, updateBike } from "../../redux/store/actions/bikeActions";
import { AppDispatch } from "../../redux/store";

interface BikeFormModalProps {
    visible: boolean;
    onClose: () => void;
    bike?: any; 
}

const BikeFormModal: React.FC<BikeFormModalProps> = ({visible, onClose, bike}) => {
    const dispatch: AppDispatch = useDispatch();
    const [form] = Form.useForm();
    
    useEffect(() => {
        if(bike) {
            form.setFieldsValue(bike);
        } else {
            form.resetFields();
        }
    }, [bike, form]);

    const handleFinish = async (values: any) => {
        const formattedValues = {
            ...values,
            pricePerHour: Number(values.pricePerHour),
            cc: Number(values.cc),
            year: Number(values.year),
        };
    
    
    if (bike) {
        try {
            await dispatch(updateBike({ ...formattedValues, _id: bike._id }));
            message.success('Bike updated successfully');
            await dispatch(fetchBikes()); 
            onClose(); 
        } catch (error) {
            message.error('Failed to update bike');
        }
    } else {
        // Create new bike
        try {
            await dispatch(createBike(formattedValues));
            message.success('Bike created successfully');
            await dispatch(fetchBikes()); 
            onClose(); 
        } catch (error) {
            message.error('Failed to create bike');
        }
    }
    };

    return(
        <Modal title={bike ? 'Edit Bike' : 'Create Bike'} visible={visible} onCancel={onClose} footer={null}>
           
           <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the bike name!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the  description!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="pricePerHour" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="cc" label="CC" rules={[{ required: true, message: 'Please input the cc!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please input the year!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="model" label="Model"rules={[{ required: true, message: 'Please input the model!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item name="brand" label="Brand"rules={[{ required: true, message: 'Please input the brand!' }]}>
             <Input/>
            </Form.Item>
            <Form.Item>
             <Button type="primary" htmlType="submit">
             {bike ? 'Update Bike' : 'Create Bike'}
             </Button>
            </Form.Item>
          </Form>
        </Modal>
    );
}


 export default BikeFormModal;











