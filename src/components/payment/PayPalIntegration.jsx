import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mockService } from '../../services/mockService';
import './PayPalIntegration.css';

const PayPalIntegration = ({
    amount,
    jewelryItem,
    currency = 'USD',
    onSuccess,
    onError,
    onCancel
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle');

    const handlePayment = async () => {
        setIsProcessing(true);
        setPaymentStatus('processing');

        try {
            // Use mockService to process PayPal payment
            const paymentResult = await mockService.processPayPalPayment({
                amount: amount,
                currency: currency,
                jewelryItem: jewelryItem,
                payerEmail: 'buyer@example.com'
            });

            if (!paymentResult.success) {
                throw new Error(paymentResult.message || 'PayPal payment failed');
            }

            setPaymentStatus('success');

            // Call success callback with payment result
            setTimeout(() => {
                onSuccess({
                    id: paymentResult.paymentId,
                    status: paymentResult.status,
                    amount: paymentResult.amount,
                    currency: paymentResult.currency,
                    item: jewelryItem,
                    timestamp: paymentResult.timestamp,
                    payerEmail: paymentResult.payerEmail
                });
            }, 1500);

        } catch (error) {
            setPaymentStatus('error');
            console.error('PayPal payment error:', error);

            // Call error callback
            setTimeout(() => {
                if (onError) {
                    onError(error);
                }
            }, 1500);
        } finally {
            setIsProcessing(false);
        }
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    return (
        <div className="paypal-container">
            <div className="paypal-header">
                <div className="paypal-logo">
                    <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
                        <path d="M10 20H15V10H10C8.34315 10 7 11.3431 7 13V17C7 18.6569 8.34315 20 10 20Z" fill="#253B80" />
                        <path d="M25 10H20V20H25C26.6569 20 28 18.6569 28 17V13C28 11.3431 26.6569 10 25 10Z" fill="#179BD7" />
                        <path d="M20 10V20H25C26.6569 20 28 18.6569 28 17V13C28 11.3431 26.6569 10 25 10H20Z" fill="#222D65" />
                        <path d="M15 10V20H20V10H15Z" fill="#253B80" />
                    </svg>
                </div>
                <h3 className="paypal-title">Pay with PayPal</h3>
            </div>

            {jewelryItem && (
                <div className="order-details">
                    <h4>Order Summary</h4>
                    <div className="item-details">
                        <p className="item-name">{jewelryItem.title || jewelryItem.name || 'Jewelry Item'}</p>
                        <p className="item-price">{formatCurrency(amount, currency)}</p>
                    </div>
                </div>
            )}

            <div className="payment-status">
                {paymentStatus === 'processing' && (
                    <div className="status-processing">
                        <div className="spinner"></div>
                        <p>Processing your payment...</p>
                    </div>
                )}

                {paymentStatus === 'success' && (
                    <div className="status-success">
                        <div className="success-icon">✓</div>
                        <p>Payment successful!</p>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="status-error">
                        <div className="error-icon">⚠</div>
                        <p>Payment failed. Please try again.</p>
                    </div>
                )}
            </div>

            <div className="paypal-actions">
                <button
                    className={`btn-paypal ${paymentStatus}`}
                    onClick={handlePayment}
                    disabled={isProcessing || paymentStatus === 'success'}
                >
                    {isProcessing ? (
                        <>
                            <span className="btn-spinner"></span>
                            Processing...
                        </>
                    ) : (
                        `Pay ${formatCurrency(amount, currency)} with PayPal`
                    )}
                </button>

                <button
                    className="btn-cancel"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    Cancel Payment
                </button>
            </div>

            <div className="security-badge">
                <div className="lock-icon">🔒</div>
                <p>Secure payment with 256-bit SSL encryption</p>
            </div>
        </div>
    );
};

PayPalIntegration.propTypes = {
    amount: PropTypes.number.isRequired,
    jewelryItem: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    currency: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func,
    onCancel: PropTypes.func.isRequired
};

export default PayPalIntegration;