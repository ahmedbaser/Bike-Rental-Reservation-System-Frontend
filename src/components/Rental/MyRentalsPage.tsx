import React, { useEffect, useState } from 'react';
import { Tabs, Button, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { fetchUserRentals } from '../../redux/store/actions/rentalActions';

const MyRentalsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('unpaid');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { unpaid, paid } = useSelector((state: RootState) => state.rental);

    useEffect(() => {
        dispatch(fetchUserRentals()); 
    }, [dispatch]);

    const handlePayment = (rentalId: string) => {
        navigate(`/payment/${rentalId}`);

    };

    return (
        <div className='ml-6 mt-4'>
            <h2 className='text-2xl md:text-2xl mb-4 text-center md:text-left'>My Rentals</h2>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <Tabs.TabPane tab="Unpaid" key="unpaid">
                    {unpaid.length > 0 ? (
                        unpaid.map((rental) => (
                            <div key={rental._id} className="rental-item">
                                <p>Bike Name: {rental.bikeName}</p>
                                <p>Start Time: {new Date(rental.startTime).toLocaleString()}</p>
                                <p>Return Time: {rental.returnTime ? new Date(rental.returnTime).toLocaleString() : 'Not returned yet'}</p>
                                <p>Total Cost: {rental.totalCost} Taka</p>
                                <Button type="primary" onClick={() => handlePayment(rental._id)}>
                                    Pay
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No unpaid rentals found.</p>
                    )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Paid" key="paid">
                    {paid.length > 0 ? (
                        paid.map((rental) => (
                            <div key={rental._id} className="rental-item">
                                <p>Bike Name: {rental.bikeName}</p>
                                <p>Start Time: {new Date(rental.startTime).toLocaleString()}</p>
                                <p>Return Time: {rental.returnTime ? new Date(rental.returnTime).toLocaleString() : 'Not returned yet'}</p>
                                <p>Total Cost: {rental.totalCost} Taka</p>
                            </div>
                        ))
                    ) : (
                        <p>No paid rentals found.</p>
                    )}
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default MyRentalsPage;


