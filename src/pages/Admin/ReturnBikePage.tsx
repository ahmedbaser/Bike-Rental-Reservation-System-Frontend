import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, notification, Spin } from 'antd'; 
import axios from 'axios';
import dayjs from 'dayjs';

interface Bike {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: number;
  year: number;
  model: string;
  brand: string;
  image: string;
}

interface BikeRental {
  _id: string;
  bikeId: Bike;
  userId: string;
  startTime: string;
  returnTime?: string;
  totalCost?: number;
  isReturned: boolean;
  isPaid: boolean;
}

const ReturnBikePage: React.FC = () => {
  const [rentals, setRentals] = useState<BikeRental[]>([]);
  const [selectedRental, setSelectedRental] = useState<BikeRental | null>(null);
  const [endTime, setEndTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true); 
        const token = localStorage.getItem('token');
        if (!token) {
          notification.error({
            message: 'Error',
            description: 'Token not found. Please log in.',
          });
          return;
        }

        const response = await axios.get(
          'https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/admin', 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const fetchedRentals = response.data.data;
        const validRentals = fetchedRentals.filter((rental: BikeRental) => rental.bikeId);
        setRentals(validRentals);

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

  const handleCalculate = async () => {
    if (selectedRental && endTime) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          notification.error({
            message: 'Error',
            description: 'Token not found. Please log in.',
          });
          return;
        }

        const startTime = dayjs(selectedRental.startTime);
        const returnTime = dayjs(endTime);
        const duration = returnTime.diff(startTime, 'hour');
        const totalCost = duration * selectedRental.bikeId.pricePerHour;

        const response = await axios.put(
          `https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/return/${selectedRental._id}`,
          { endTime, totalCost, isPaid: false },  // Mark as unpaid
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          notification.success({
            message: 'Success',
            description: response.data.message,
          });

          setRentals(prevRentals =>
            prevRentals.map(rental =>
              rental._id === selectedRental._id
                ? { ...rental, returnTime: endTime, isReturned: true, totalCost: response.data.data.totalCost, isPaid: false }
                : rental
            )
          );
        }
      } catch (error) {
        console.error('Failed to return bike', error);
        notification.error({
          message: 'Error',
          description: 'Failed to return bike. Please try again.',
        });
      } finally {
        setEndTime('');
        setSelectedRental(null);
      }
    }
  };

  const columns = [
    { 
      title: 'Bike ID', 
      dataIndex: ['bikeId', '_id'],  
      key: 'bikeId', 
    },
    { 
      title: 'Bike Name', 
      dataIndex: ['bikeId', 'name'],  
      key: 'bikeName', 
    },
    { 
      title: 'User ID', 
      dataIndex: 'userId', 
      key: 'userId' 
    },
    { 
      title: 'Start Time', 
      dataIndex: 'startTime', 
      key: 'startTime',
      render: (startTime: string) => dayjs(startTime).format('YYYY-MM-DD HH:mm'), // Format the date
    },
    { 
      title: 'Return Time', 
      dataIndex: 'returnTime', 
      key: 'returnTime',
      render: (returnTime: string) => returnTime ? dayjs(returnTime).format('YYYY-MM-DD HH:mm') : 'N/A', // Format returnTime or show 'N/A'
    },
    { 
      title: 'Total Cost', 
      dataIndex: 'totalCost', 
      key: 'totalCost',
      render: (totalCost: number) => totalCost ? `$${totalCost}` : 'Pending',
    },
    { 
      title: 'Status', 
      dataIndex: 'isReturned', 
      key: 'status', 
      render: (isReturned: boolean) => isReturned ? 'Returned' : 'Pending' 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: BikeRental) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedRental(record);
            setEndTime('');
            Modal.confirm({
              title: 'Calculate Return',
              content: (
                <Input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              ),
              onOk: handleCalculate,
            });
          }}
        >
          Calculate
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl md:text-2xl mb-4 text-center md:text-left">Return Bike</h1>
      {loading ? ( 
        <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 64px)' }}>
        <Spin style={{ fontSize: '40px' }} />
      </div>
      ) : (
        <Table
          dataSource={rentals}
          columns={columns}
          rowKey="_id"
          scroll={{ x: 800 }}
          pagination={{ pageSize: 8 }}
          className="rental-table"
        />
      )}
    </div>
  );
};

export default ReturnBikePage;

