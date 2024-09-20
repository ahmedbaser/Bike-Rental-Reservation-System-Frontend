import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router-dom';


const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const PaymentPage: React.FC = () => {
    const { rentalId } = useParams<{ rentalId: string }>();

    if (!rentalId) {
        return <div>Error: Rental ID is required</div>;
    }
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm rentalId={rentalId} />
        </Elements>
    );
};

export default PaymentPage;






































































