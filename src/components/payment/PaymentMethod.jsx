// src/components/payment/PaymentMethod.jsx - FIXED VERSION
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mockService } from '../../services/mockService';
import "./PaymentMethod.css";

const PaymentMethod = ({ totalAmount = 2500.00, onPaymentSuccess, onPaymentError }) => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);

    // Sample saved payment methods
    const [savedMethods, setSavedMethods] = useState([
        {
            id: 1,
            type: 'card',
            cardNumber: '**** **** **** 4242',
            cardHolder: 'John Smith',
            expiry: '12/26',
            isDefault: true
        }
    ]);

    const handleMethodSelect = (methodId) => {
        setSelectedMethod(methodId);
        console.log('User selected method ID:', methodId);
    };

    const handleContinue = async () => {
        if (!selectedMethod) {
            alert('Please select a payment method first!');
            return;
        }

        setIsLoading(true);

        try {
            // Use mock service for payment processing
            const paymentResult = await mockService.processPayment(
                totalAmount,
                selectedMethod === 'paypal' ? 'paypal' : 'card',
                { id: 'jewelry-item-001', title: 'Jewelry Item' }
            );

            if (onPaymentSuccess) {
                onPaymentSuccess(paymentResult);
            }

            alert('Payment successful! Your jewelry purchase is confirmed.');
        } catch (error) {
            console.error('Payment error:', error);
            if (onPaymentError) {
                onPaymentError(error);
            }
            alert('Payment failed. Please try again or use a different payment method.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveMethod = (methodId) => {
        setSavedMethods(prev => prev.filter(method => method.id !== methodId));
    };

    const toggleAddCard = () => {
        setShowAddCard(!showAddCard);
    };

    return (
        <div className="payment-method-container">
            <h3>💎 CrystalCrown Payment</h3>

            <div className="total-amount">
                Total Amount: ${totalAmount.toLocaleString()}
            </div>

            <div className="payment-methods-list">
                {savedMethods.map(method => (
                    <div
                        key={method.id}
                        className={`payment-method-item ${method.type} ${selectedMethod === method.id ? 'selected' : ''}`}
                        onClick={() => handleMethodSelect(method.id)}
                    >
                        <div className="method-info">
                            <div className="card-icon">CARD</div>
                            <div className="card-details">
                                <div className="card-number">{method.cardNumber}</div>
                                <div className="cardholder-name">{method.cardHolder}</div>
                                <div className="expiry">Expires: {method.expiry}</div>
                            </div>
                        </div>
                        <button
                            className="remove-method"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveMethod(method.id);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}

                <div
                    className={`payment-method-item paypal ${selectedMethod === 'paypal' ? 'selected' : ''}`}
                    onClick={() => handleMethodSelect('paypal')}
                >
                    <div className="method-info">
                        <div className="paypal-icon">PayPal</div>
                        <div className="card-details">
                            <div className="card-number">PayPal Account</div>
                            <div className="cardholder-name">Secure payment with PayPal</div>
                            <div className="expiry">Buyer Protection included</div>
                        </div>
                    </div>
                </div>

                <div
                    className={`payment-method-item stripe ${selectedMethod === 'stripe' ? 'selected' : ''}`}
                    onClick={() => handleMethodSelect('stripe')}
                >
                    <div className="method-info">
                        <div className="stripe-icon">Stripe</div>
                        <div className="card-details">
                            <div className="card-number">New Credit Card</div>
                            <div className="cardholder-name">Visa, MasterCard, American Express</div>
                            <div className="expiry">Bank-level security</div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="add-payment-method-btn"
                onClick={toggleAddCard}
            >
                + Add New Payment Method
            </button>

            <button
                onClick={handleContinue}
                disabled={isLoading || !selectedMethod}
                className="continue-payment-btn"
            >
                {isLoading ? 'Processing...' : 'Continue to Secure Payment'}
            </button>

            {selectedMethod && (
                <div className="security-notice">
                    <small>
                        🔒 All transactions are secured with 256-bit SSL encryption and PCI DSS compliance
                    </small>
                </div>
            )}

            <div className="security-features">
                <h5>Security Features:</h5>
                <ul>
                    <li>PCI DSS compliant payment processing</li>
                    <li>Tokenization of sensitive data</li>
                    <li>3D Secure authentication</li>
                    <li>Fraud detection system</li>
                </ul>
            </div>
        </div>
    );
};

PaymentMethod.propTypes = {
    totalAmount: PropTypes.number,
    onPaymentSuccess: PropTypes.func,
    onPaymentError: PropTypes.func
};

PaymentMethod.defaultProps = {
    totalAmount: 2500.00
};

export default PaymentMethod;