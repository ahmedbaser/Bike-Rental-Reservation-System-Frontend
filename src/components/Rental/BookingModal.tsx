import { Button, DatePicker, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { bookBike } from "../../redux/store/actions/rentalActions";
import { AppDispatch } from "../../redux/store/index";

interface BookingModalProps {
    bikeId: string;
    visible: boolean;
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({bikeId, visible, onClose}) => {
    const [startTime, setStartTime] = useState<moment.Moment | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleBooking = async () => {
        if (!startTime) {
            message.warning('Please select a start time.');
            return;
        }

        try {
            const result = await dispatch(bookBike(bikeId, startTime.toISOString(), 100)); 

            const rental = result;

            if (rental && rental._id) {
                message.success(`Booking confirmed! Bike: ${rental.bikeName}. You will be redirected to the payment page.`);
                onClose(); 
                navigate(`/payment/${rental._id}`);  
            } else {
                console.error('Rental data is undefined or missing _id:', rental);
                message.error('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            message.error('Booking failed. Please try again.');
        }
    };

    return (
        <Modal 
            title="Book Your Bike" 
            visible={visible} 
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Cancel</Button>,
                <Button key="book" onClick={handleBooking}>Pay & Confirm</Button>,
            ]}
        >
            <DatePicker 
                showTime 
                placeholder="Select Start Time" 
                value={startTime} 
                onChange={(value) => setStartTime(value)} 
                style={{width: '100%' }}
            />
            <p className="mt-2">Advance Payment: Tk 100</p>
        </Modal>
    );
};

export default BookingModal;
