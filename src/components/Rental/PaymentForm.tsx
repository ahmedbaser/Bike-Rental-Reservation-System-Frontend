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
            const response = await fetch('http://localhost:5000/api/payments/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ rentalId }),
            });

            if (!response.ok) {
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
        } catch (error) {
            setError(`An unexpected error occurred: ${error.message}`);
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <div className="payment-page">
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
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
                />
                {error && <div className="error-message">{error}</div>}
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    disabled={paymentProcessing}
                    style={{ marginTop: '20px' }}
                >
                    {paymentProcessing ? 'Processing...' : 'Pay'}
                </Button>
            </form>
        </div>
    );
};

export default PaymentForm;


























