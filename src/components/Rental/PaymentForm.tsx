import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message } from 'antd';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AppDispatch, RootState } from '../../redux/store';
import { payForRental } from '../../redux/store/actions/rentalActions';

const PaymentForm: React.FC<{ rentalId: string }> = ({ rentalId }) => {
    const [error, setError] = useState<string | null>(null);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch: AppDispatch = useDispatch();
    
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
            return;
        }
    
        setPaymentProcessing(true);
    
        try {
            const response = await fetch('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/payments/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ rentalId }),
            });
    
            if (!response.ok) {
                const errorResponse = await response.json(); 
                console.error('Error from server:', errorResponse); 
                throw new Error(`Failed to create payment intent: ${response.statusText}`);
            }
    
            const paymentIntent = await response.json();
    
            const { error } = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: user?.name || 'Guest',
                    },
                },
            });
    
            if (error) {
                setError(error.message || 'Payment failed');
            } else {
                dispatch(payForRental(rentalId));
                message.success('Payment successful!');
            }
        } catch (error: any) { 
            setError(`An unexpected error occurred: ${error.message}`);
            console.error('Payment Error:', error); 
        } finally {
            setPaymentProcessing(false);
        }
    };
    
    return (
        <div className="payment-page max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="border border-gray-300 p-2 rounded-md"
                />
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    disabled={paymentProcessing}
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md"
                >
                    {paymentProcessing ? 'Processing...' : 'Pay'}
                </Button>
            </form>
        </div>
    );
};

export default PaymentForm;
