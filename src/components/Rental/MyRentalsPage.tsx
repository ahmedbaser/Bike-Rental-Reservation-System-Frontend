import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, notification, Spin } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { payRentalFail, payRentalSuccess } from '../../redux/store/reducers/rentalReducer';

interface Bike {
  _id: string;
  name: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
}

interface Rental {
  _id: string;
  bikeId: Bike;
  startTime: string;
  returnTime?: string;
  totalCost?: number;
  isReturned: boolean;
  isPaid: boolean;
  advancePayment: number;
}

const MyRentalPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          notification.error({
            message: 'Error',
            description: 'Token not found. Please log in.',
          });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRentals(response.data.data);
      } catch (error) {
        console.error('Failed to fetch rentals', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch rentals. Please try again.',
        });
      } finally {
        setLoading(false); 
      }
    };

    fetchRentals();
  }, []);

  const handlePayment = async (rentalId: string, totalCost: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        notification.error({
          message: 'Error',
          description: 'Token not found. Please log in.',
        });
        return;
      }

      const response = await axios.post(
        `https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/pay/${rentalId}`,
        { totalCost },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        dispatch(payRentalSuccess({ rentalId, totalCost }));
        notification.success({
          message: 'Payment Successful',
          description: response.data.message,
        });

        setRentals(rentals.map(rental =>
          rental._id === rentalId ? { ...rental, isPaid: true } : rental
        ));
      }
    } catch (error) {
      console.error('Payment failed', error);
      dispatch(payRentalFail('Payment failed. Please try again.'));
      notification.error({
        message: 'Payment Failed',
        description: 'Payment failed. Please try again.',
      });
    }
  };

  const columnsUnpaid = [
    { title: 'Bike', dataIndex: ['bikeId', 'name'], key: 'bikeName' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime', render: (startTime: string) => dayjs(startTime).format('YYYY-MM-DD HH:mm') },
    { title: 'Return Time', dataIndex: 'returnTime', key: 'returnTime', render: (returnTime: string) => returnTime ? dayjs(returnTime).format('YYYY-MM-DD HH:mm') : 'N/A' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost', render: (totalCost: number) => totalCost ? `$${totalCost}` : 'Pending' },
    { title: 'Status', dataIndex: 'isReturned', key: 'status', render: (isReturned: boolean) => isReturned ? 'Returned' : 'Pending' },
    { title: 'Action', key: 'action', render: (_: unknown, record: Rental) => (
        <Button
          type="primary"
          onClick={() => handlePayment(record._id, record.totalCost || 0)}
          disabled={!record.totalCost || record.isPaid}
        >
          Pay
        </Button>
      ) },
  ];

  const columnsPaid = [
    { title: 'Bike', dataIndex: ['bikeId', 'name'], key: 'bikeName' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime', render: (startTime: string) => dayjs(startTime).format('YYYY-MM-DD HH:mm') },
    { title: 'Return Time', dataIndex: 'returnTime', key: 'returnTime', render: (returnTime: string) => returnTime ? dayjs(returnTime).format('YYYY-MM-DD HH:mm') : 'N/A' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost', render: (totalCost: number) => totalCost ? `$${totalCost}` : 'Pending' },
    { title: 'Payment Status', dataIndex: 'isPaid', key: 'isPaid', render: (isPaid: boolean) => isPaid ? 'Paid' : 'Unpaid' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-xl md:text-2xl mb-4 text-center md:text-left">My Rentals</h1>
      {loading ? (
        <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 64px)' }}>
          <Spin style={{ fontSize: '40px' }} />
        </div>
      ) : (
        <Tabs defaultActiveKey="unpaid" size="large">
          <Tabs.TabPane tab="Unpaid" key="unpaid">
            <div className="overflow-x-auto">
              <Table 
                dataSource={rentals.filter(rental => !rental.isPaid)} 
                columns={columnsUnpaid} 
                rowKey="_id" 
                pagination={{ pageSize: 5 }} 
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Paid" key="paid">
            <div className="overflow-x-auto">
              <Table 
                dataSource={rentals.filter(rental => rental.isPaid)} 
                columns={columnsPaid} 
                rowKey="_id" 
                // Added pagination for better usability on small screens
                pagination={{ pageSize: 5 }} 
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default MyRentalPage;
