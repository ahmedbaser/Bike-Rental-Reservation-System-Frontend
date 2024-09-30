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

  const calculateTotalCost = (startTime: string, returnTime: string) => {
    if (!startTime || !returnTime) return 0;

    const start = new Date(startTime);
    const end = new Date(returnTime);

    const durationInMilliseconds = end.getTime() - start.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    const hourlyRate = 20; 

    // Calculate the total cost
    return Math.max(durationInHours * hourlyRate, 0); 
  };

  const handleReturnBike = async (rentalId: string, startTime: string) => {
    try {
      const returnTime = new Date().toISOString();
      const totalCost = calculateTotalCost(startTime, returnTime);
      await dispatch(returnBike(rentalId, { returnTime, totalCost }));
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
      render: (record: any) => (
        <>
          {!record.returnTime && (
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











