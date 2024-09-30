import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form, Input, message, Col, Row } from 'antd';
import moment from 'moment-timezone'; 
import { fetchCoupons, createCoupon, updateCoupon, deleteCoupon } from '../../redux/store/actions/couponActions';
import { AppDispatch } from '../../redux/store';

const CouponManagementPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state: any) => state.coupon);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleCreateOrUpdate = (values: any) => {
    const { expirationDate } = values;
    // Convert expirationDate to Bangladesh time zone and format it to include AM/PM
    const expirationDateInBST = moment(expirationDate)
      .tz('Asia/Dhaka')
      .format('YYYY-MM-DD hh:mm A'); // Format to show in 12-hour with AM/PM

    const couponData = {
      ...values,
      expirationDate: expirationDateInBST,
    };

    if (isEditMode && selectedCoupon) {
      dispatch(updateCoupon(selectedCoupon._id, couponData))
        .then(() => {
          message.success('Coupon updated successfully');
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(() => {
          message.error('Failed to update coupon');
        });
    } else {
      dispatch(createCoupon(couponData))
        .then(() => {
          message.success('Coupon created successfully');
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(() => {
          message.error('Failed to create coupon');
        });
    }
  };

  const handleEdit = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsEditMode(true);
    form.setFieldsValue({
      code: coupon.code,
      discount: coupon.discount,
      expirationDate: moment(coupon.expirationDate).tz('Asia/Dhaka').format('YYYY-MM-DD'), // Display date in BST
    });
    setIsModalVisible(true);
  };

  const handleDelete = (couponId: string) => {
    dispatch(deleteCoupon(couponId))
      .then(() => {
        message.success('Coupon deleted successfully');
      })
      .catch(() => {
        message.error('Failed to delete coupon');
      });
  };

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (date: string) => moment(date)
        .tz('Asia/Dhaka')
        .format('YYYY-MM-DD hh:mm A'), // Format with AM/PM
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: any) => (
        <div className="space-x-2">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="default" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const showModal = () => {
    setIsEditMode(false);
    setSelectedCoupon(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Col xs={24} md={16} lg={12}>
        <h1 className="text-2xl md:text-2xl mb-4 text-center md:text-left">Coupon Management</h1>
      </Col>
      <Button className="mb-4" type="primary" onClick={showModal}>
        Create Coupon
      </Button>
      <Row>
        <Col xs={24}>
          <Table
            columns={columns}
            dataSource={coupons}
            rowKey="_id"
            loading={loading}
            scroll={{ x: 600 }}
          />
        </Col>
      </Row>

      <Modal
        title={isEditMode ? 'Edit Coupon' : 'Create Coupon'}
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
        okText={isEditMode ? 'Update' : 'Create'}
      >
        <Form form={form} onFinish={handleCreateOrUpdate} layout="vertical">
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                name="code"
                label="Coupon Code"
                rules={[{ required: true, message: 'Please enter the coupon code' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="discount"
                label="Discount (%)"
                rules={[{ required: true, message: 'Please enter the discount percentage' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="expirationDate"
                label="Expiration Date"
                rules={[{ required: true, message: 'Please enter the expiration date' }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CouponManagementPage;







