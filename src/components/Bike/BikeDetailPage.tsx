import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBikeDetails } from "../../redux/store/actions/bikeActions";
import { Button, Card } from "antd";
import { AppDispatch, RootState } from "../../redux/store/index";
import {  useParams } from "react-router-dom";
import BookingModal from "../Rental/BookingModal";

const BikeDetailPage: React.FC = () => {
    const { bikeId } = useParams<Record<string, string | undefined>>();
    const dispatch: AppDispatch = useDispatch();
    const bike = useSelector((state: RootState) => state.bike.selectedBike);
    


    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        console.log('useEffect triggered with bikeId:', bikeId);
        if (bikeId) {
            dispatch(fetchBikeDetails(bikeId));
        }
    }, [dispatch, bikeId]);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    

    return (
        <div className="container mx-auto p-6">
            {bike ? (
                <Card title={bike.name}>
                    <p>Description: {bike.description}</p>
                    <p>Price: ${bike.pricePerHour}</p>
                    <p>CC: {bike.cc}</p>
                    <p>Year: {bike.year}</p>
                    <p>Brand: {bike.brand}</p>
                    <p>Availability: {bike.isAvailable ? 'Available' : 'Not Available'}</p>
                    <Button type="primary" onClick={handleOpenModal}>
                        Book Now
                    </Button>
                    <BookingModal
                        bikeId={bikeId || ""}  
                        visible={isModalVisible}
                        onClose={handleCloseModal}
                    />
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BikeDetailPage;




