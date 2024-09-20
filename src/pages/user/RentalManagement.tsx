import React, { useEffect } from 'react';
import { Button, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchAllRentals, returnBike } from '../../redux/store/actions/rentalActions';

const RentalManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rentals, loading } = useSelector((state: RootState) => state.rental);

  useEffect(() => {
    dispatch(fetchAllRentals()); 
  }, [dispatch]);

  const calculateTotalCost = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;

    const start = new Date(startTime);
    const end = new Date(endTime);

    const durationInMilliseconds = end.getTime() - start.getTime();

    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    const hourlyRate = 20; 

    // Calculate the total cost
    const totalCost = Math.max(durationInHours * hourlyRate, 0); 

    return totalCost;
  };

  const handleReturnBike = async (rentalId: string, startTime: string) => {
    try {
      const endTime = new Date().toISOString();
      const totalCost = calculateTotalCost(startTime, endTime);
      await dispatch(returnBike(rentalId, { endTime, totalCost }));
      message.success('Bike returned successfully');
    } catch {
      message.error('Failed to return bike');
    }
  };

  const columns = [
    { title: 'Bike Name', dataIndex: ['bike', 'name'], key: 'bikeName' },
    { title: 'User Name', dataIndex: ['user', 'name'], key: 'userName' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
    { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <>
          {!record.endTime && (
            <Button onClick={() => handleReturnBike(record._id, record.startTime)}>Return Bike</Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Rental Management</h2>
      <Table columns={columns} dataSource={rentals} loading={loading} rowKey="_id" />
    </div>
  );
};

export default RentalManagement;


























