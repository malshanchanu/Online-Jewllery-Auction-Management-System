// src/components/payment/StripeIntegration.jsx - FIXED VERSION
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { mockService } from '../../services/mockService';
import './StripeIntegration.css';

const StripeIntegration = ({ amount, jewelryItem, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage('Stripe not loaded yet. Please wait...');
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Create payment method using Stripe Elements
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Customer Name',
                    email: 'customer@example.com'
                }
            });

            if (error) {
                throw new Error(error.message);
            }

            // Use mockService for payment processing
            const paymentResult = await mockService.processStripePayment({
                amount: amount,
                currency: 'usd',
                paymentMethodId: paymentMethod.id,
                jewelryItem: jewelryItem
            });

            if (!paymentResult.success) {
                throw new Error(paymentResult.message || 'Stripe payment failed');
            }

            // Payment successful
            onSuccess({
                id: paymentResult.paymentId,
                status: paymentResult.status,
                amount: paymentResult.amount,
                currency: paymentResult.currency,
                paymentMethod: paymentMethod.card,
                timestamp: paymentResult.timestamp
            });

        } catch (error) {
            console.error('Payment error:', error);
            setErrorMessage(error.message || 'Payment failed. Please try again.');
            if (onError) {
                onError(error);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px 12px',
            },
            invalid: {
                color: '#9e2146',
                iconColor: '#9e2146',
            },
        },
        hidePostalCode: true
    };

    return (
        <div className="stripe-container">
            <h3 className="stripe-title">Pay with Credit Card</h3>

            <form className="stripe-form" onSubmit={handlePayment}>
                <div className="stripe-element-container">
                    <label className="stripe-label">Card Information</label>
                    <CardElement
                        options={cardElementOptions}
                        className="stripe-card-element"
                    />
                </div>

                {errorMessage && (
                    <div className="stripe-error">
                        ⚠️ {errorMessage}
                    </div>
                )}

                <button
                    className="btn-stripe"
                    type="submit"
                    disabled={!stripe || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <span className="spinner"></span>
                            Processing...
                        </>
                    ) : (
                        `Pay $${amount.toFixed(2)}`
                    )}
                </button>

                <div className="stripe-security-note">
                    🔒 Secured by Stripe • Your card details are never stored on our servers
                </div>

                <div className="stripe-test-note">
                    <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242, any future expiry, any CVC
                </div>
            </form>
        </div>
    );
};

export default StripeIntegration;