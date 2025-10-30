import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import PaymentMethod from './PaymentMethod';
import PayPalIntegration from './PayPalIntegration';
import StripeIntegration from './StripeIntegration';
import InsuranceOptions from './InsuranceOptions';
import ShippingInsurance from './ShippingInsurance';
import { mockService } from '../../services/mockService';
import './JewelryCheckout.css';

const JewelryCheckout = ({ jewelryItem, bidAmount, onCheckoutComplete }) => {
    const [step, setStep] = useState(1);
    const [checkoutData, setCheckoutData] = useState({
        jewelry: jewelryItem || {},
        amount: bidAmount || 0,
        shippingAddress: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US'
        },
        billingAddress: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'US',
            sameAsShipping: true
        },
        paymentMethod: null,
        insurance: {
            selected: false,
            type: null,
            amount: 0
        },
        shipping: {
            method: 'standard',
            cost: 25.00,
            insurance: false,
            insuranceCost: 0
        }
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSummary, setOrderSummary] = useState({});

    const calculateOrderSummary = useCallback(() => {
        const itemTotal = checkoutData.amount;
        const shippingCost = checkoutData.shipping.cost;
        const insuranceCost = checkoutData.insurance.amount || 0;
        const shippingInsurance = checkoutData.shipping.insurance ? checkoutData.shipping.insuranceCost : 0;
        const tax = (itemTotal + shippingCost) * 0.08; // 8% tax
        const total = itemTotal + shippingCost + insuranceCost + shippingInsurance + tax;

        setOrderSummary({
            itemTotal: itemTotal || 0,
            shippingCost: shippingCost || 0,
            insuranceCost: insuranceCost || 0,
            shippingInsurance: shippingInsurance || 0,
            tax: tax || 0,
            total: total || 0
        });
    }, [checkoutData]);

    useEffect(() => {
        calculateOrderSummary();
    }, [calculateOrderSummary]);

    // Enhanced validation with better error messages
    const validateStep = (stepNumber) => {
        const newErrors = {};

        if (stepNumber === 1) {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate shipping address
            if (!checkoutData.shippingAddress.fullName.trim()) {
                newErrors.shippingFullName = 'Full name is required';
            }
            if (!checkoutData.shippingAddress.email.trim()) {
                newErrors.shippingEmail = 'Email is required';
            } else if (!emailRegex.test(checkoutData.shippingAddress.email)) {
                newErrors.shippingEmail = 'Please enter a valid email address';
            }
            if (!checkoutData.shippingAddress.address.trim()) {
                newErrors.shippingAddress = 'Address is required';
            }
            if (!checkoutData.shippingAddress.city.trim()) {
                newErrors.shippingCity = 'City is required';
            }
            if (!checkoutData.shippingAddress.zipCode.trim()) {
                newErrors.shippingZip = 'ZIP code is required';
            }

            // Validate billing address if different from shipping
            if (!checkoutData.billingAddress.sameAsShipping) {
                if (!checkoutData.billingAddress.fullName.trim()) {
                    newErrors.billingFullName = 'Full name is required';
                }
                if (!checkoutData.billingAddress.address.trim()) {
                    newErrors.billingAddress = 'Address is required';
                }
                if (!checkoutData.billingAddress.city.trim()) {
                    newErrors.billingCity = 'City is required';
                }
                if (!checkoutData.billingAddress.zipCode.trim()) {
                    newErrors.billingZip = 'ZIP code is required';
                }
            }
        }

        if (stepNumber === 2) {
            if (!checkoutData.paymentMethod) {
                newErrors.paymentMethod = 'Please select a payment method';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleInputChange = (section, field, value) => {
        setCheckoutData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleBillingAddressToggle = (sameAsShipping) => {
        if (sameAsShipping) {
            setCheckoutData(prev => ({
                ...prev,
                billingAddress: {
                    ...prev.shippingAddress,
                    sameAsShipping: true
                }
            }));
        } else {
            setCheckoutData(prev => ({
                ...prev,
                billingAddress: {
                    ...prev.billingAddress,
                    sameAsShipping: false
                }
            }));
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setCheckoutData(prev => ({
            ...prev,
            paymentMethod: method
        }));
    };

    const handleInsuranceSelect = (insuranceData) => {
        setCheckoutData(prev => ({
            ...prev,
            insurance: insuranceData
        }));
    };

    const handleShippingSelect = (shippingData) => {
        setCheckoutData(prev => ({
            ...prev,
            shipping: shippingData
        }));
    };

    // Enhanced API call with better error handling
    const handlePaymentSuccess = async (paymentData) => {
        setIsProcessing(true);

        try {
            // Use mockService to process payment
            const paymentResult = await mockService.processPayment(
                orderSummary.total,
                paymentData.method || checkoutData.paymentMethod?.type,
                checkoutData.jewelry
            );

            if (!paymentResult.success) {
                throw new Error(paymentResult.message || 'Payment processing failed');
            }

            // Send confirmation email using mockService
            const emailResult = await mockService.sendConfirmationEmail(
                paymentResult,
                checkoutData.shippingAddress.email
            );

            if (!emailResult.success) {
                console.warn('Email sending failed:', emailResult.message);
            }

            setStep(5); // Success step
            if (onCheckoutComplete) {
                onCheckoutComplete({
                    ...paymentResult,
                    orderSummary: orderSummary,
                    shippingAddress: checkoutData.shippingAddress,
                    billingAddress: checkoutData.billingAddress
                });
            }

        } catch (error) {
            console.error('Order creation failed:', error);
            setErrors({ order: error.message || 'Failed to process order. Please contact support.' });
        } finally {
            setIsProcessing(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="step-content">
                        <h2>Shipping & Billing Information</h2>

                        {/* Shipping Address */}
                        <div className="address-section">
                            <h3>Shipping Address</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input
                                        type="text"
                                        value={checkoutData.shippingAddress.fullName}
                                        onChange={(e) => handleInputChange('shippingAddress', 'fullName', e.target.value)}
                                        className={errors.shippingFullName ? 'error' : ''}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.shippingFullName && <span className="error-text">{errors.shippingFullName}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        value={checkoutData.shippingAddress.email}
                                        onChange={(e) => handleInputChange('shippingAddress', 'email', e.target.value)}
                                        className={errors.shippingEmail ? 'error' : ''}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.shippingEmail && <span className="error-text">{errors.shippingEmail}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        value={checkoutData.shippingAddress.phone}
                                        onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                                        placeholder="(555) 123-4567"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        value={checkoutData.shippingAddress.address}
                                        onChange={(e) => handleInputChange('shippingAddress', 'address', e.target.value)}
                                        className={errors.shippingAddress ? 'error' : ''}
                                        placeholder="123 Main Street, Apt 4B"
                                    />
                                    {errors.shippingAddress && <span className="error-text">{errors.shippingAddress}</span>}
                                </div>

                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        value={checkoutData.shippingAddress.city}
                                        onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                                        className={errors.shippingCity ? 'error' : ''}
                                        placeholder="New York"
                                    />
                                    {errors.shippingCity && <span className="error-text">{errors.shippingCity}</span>}
                                </div>

                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        value={checkoutData.shippingAddress.state}
                                        onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                                        placeholder="NY"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ZIP Code *</label>
                                    <input
                                        type="text"
                                        value={checkoutData.shippingAddress.zipCode}
                                        onChange={(e) => handleInputChange('shippingAddress', 'zipCode', e.target.value)}
                                        className={errors.shippingZip ? 'error' : ''}
                                        placeholder="10001"
                                    />
                                    {errors.shippingZip && <span className="error-text">{errors.shippingZip}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <select
                                        value={checkoutData.shippingAddress.country}
                                        onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
                                    >
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="AU">Australia</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className="address-section">
                            <div className="billing-header">
                                <h3>Billing Address</h3>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={checkoutData.billingAddress.sameAsShipping}
                                        onChange={(e) => handleBillingAddressToggle(e.target.checked)}
                                    />
                                    Same as shipping address
                                </label>
                            </div>

                            {!checkoutData.billingAddress.sameAsShipping && (
                                <div className="form-grid billing-form">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            value={checkoutData.billingAddress.fullName}
                                            onChange={(e) => handleInputChange('billingAddress', 'fullName', e.target.value)}
                                            className={errors.billingFullName ? 'error' : ''}
                                        />
                                        {errors.billingFullName && <span className="error-text">{errors.billingFullName}</span>}
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Address *</label>
                                        <input
                                            type="text"
                                            value={checkoutData.billingAddress.address}
                                            onChange={(e) => handleInputChange('billingAddress', 'address', e.target.value)}
                                            className={errors.billingAddress ? 'error' : ''}
                                        />
                                        {errors.billingAddress && <span className="error-text">{errors.billingAddress}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            value={checkoutData.billingAddress.city}
                                            onChange={(e) => handleInputChange('billingAddress', 'city', e.target.value)}
                                            className={errors.billingCity ? 'error' : ''}
                                        />
                                        {errors.billingCity && <span className="error-text">{errors.billingCity}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>State</label>
                                        <input
                                            type="text"
                                            value={checkoutData.billingAddress.state}
                                            onChange={(e) => handleInputChange('billingAddress', 'state', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>ZIP Code *</label>
                                        <input
                                            type="text"
                                            value={checkoutData.billingAddress.zipCode}
                                            onChange={(e) => handleInputChange('billingAddress', 'zipCode', e.target.value)}
                                            className={errors.billingZip ? 'error' : ''}
                                        />
                                        {errors.billingZip && <span className="error-text">{errors.billingZip}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Country</label>
                                        <select
                                            value={checkoutData.billingAddress.country}
                                            onChange={(e) => handleInputChange('billingAddress', 'country', e.target.value)}
                                        >
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h2>Payment Method</h2>
                        <PaymentMethod
                            onPaymentMethodSelect={handlePaymentMethodSelect}
                            selectedMethod={checkoutData.paymentMethod}
                            totalAmount={orderSummary.total}
                        />
                        {errors.paymentMethod && <div className="error-text">{errors.paymentMethod}</div>}
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h2>Insurance & Shipping Options</h2>
                        <div className="insurance-section">
                            <h3>Jewelry Insurance</h3>
                            <p className="insurance-note">
                                Protect your valuable jewelry with our insurance options.
                                Recommended for items over $1,000.
                            </p>
                            <InsuranceOptions
                                jewelryValue={checkoutData.amount}
                                onInsuranceSelect={handleInsuranceSelect}
                                selectedInsurance={checkoutData.insurance}
                            />
                        </div>

                        <div className="insurance-section">
                            <h3>Shipping Insurance</h3>
                            <p className="insurance-note">
                                Additional protection for your shipment against loss or damage during transit.
                            </p>
                            <ShippingInsurance onSelect={handleShippingSelect} />
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h2>Complete Payment</h2>
                        {checkoutData.paymentMethod?.type === 'paypal' && (
                            <PayPalIntegration
                                amount={orderSummary.total}
                                jewelryItem={checkoutData.jewelry}
                                onSuccess={handlePaymentSuccess}
                                onError={(error) => setErrors({ payment: error.message })}
                                onCancel={() => setStep(2)}
                            />
                        )}
                        {(checkoutData.paymentMethod?.type === 'stripe' || checkoutData.paymentMethod?.type === 'card') && (
                            <StripeIntegration
                                amount={orderSummary.total}
                                jewelryItem={checkoutData.jewelry}
                                savedCard={checkoutData.paymentMethod?.type === 'card' ? checkoutData.paymentMethod : null}
                                onSuccess={handlePaymentSuccess}
                                onError={(error) => setErrors({ payment: error.message })}
                            />
                        )}
                        {errors.payment && <div className="error-text">{errors.payment}</div>}
                        {errors.order && <div className="error-text">{errors.order}</div>}
                    </div>
                );

            case 5:
                return (
                    <div className="step-content success">
                        <div className="success-icon">✅</div>
                        <h2>Payment Successful!</h2>
                        <p>Thank you for your purchase. Your order has been confirmed.</p>
                        <div className="order-details">
                            <h3>Order Summary</h3>
                            <p><strong>Item:</strong> {checkoutData.jewelry.title || 'Jewelry Item'}</p>
                            <p><strong>Amount:</strong> ${orderSummary.total.toFixed(2)}</p>
                            <p><strong>Confirmation will be sent to:</strong> {checkoutData.shippingAddress.email}</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="jewelry-checkout-container">
            {/* Progress Steps */}
            <div className="checkout-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                    <span className="step-number">1</span>
                    <span className="step-label">Shipping</span>
                </div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                    <span className="step-number">2</span>
                    <span className="step-label">Payment</span>
                </div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <span className="step-label">Insurance</span>
                </div>
                <div className={`step ${step >= 4 ? 'active' : ''}`}>
                    <span className="step-number">4</span>
                    <span className="step-label">Complete</span>
                </div>
            </div>

            <div className="checkout-content">
                {/* Main Content */}
                <div className="checkout-main">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    {step < 5 && (
                        <div className="checkout-navigation">
                            {step > 1 && (
                                <button className="btn-secondary" onClick={handleBack}>
                                    Back
                                </button>
                            )}
                            {step < 4 && (
                                <button className="btn-primary" onClick={handleNext}>
                                    Continue
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="order-summary-sidebar">
                    <div className="order-summary">
                        <h3>Order Summary</h3>

                        <div className="jewelry-item">
                            {checkoutData.jewelry.image && (
                                <img src={checkoutData.jewelry.image} alt={checkoutData.jewelry.title || 'Jewelry Item'} />
                            )}
                            <div className="item-info">
                                <h4>{checkoutData.jewelry.title || 'Jewelry Item'}</h4>
                                <p>{checkoutData.jewelry.description || 'Premium jewelry piece'}</p>
                            </div>
                        </div>

                        <div className="summary-lines">
                            <div className="summary-line">
                                <span>Item Total:</span>
                                <span>${orderSummary.itemTotal?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="summary-line">
                                <span>Shipping:</span>
                                <span>${orderSummary.shippingCost?.toFixed(2) || '0.00'}</span>
                            </div>
                            {orderSummary.insuranceCost > 0 && (
                                <div className="summary-line">
                                    <span>Jewelry Insurance:</span>
                                    <span>${orderSummary.insuranceCost?.toFixed(2)}</span>
                                </div>
                            )}
                            {orderSummary.shippingInsurance > 0 && (
                                <div className="summary-line">
                                    <span>Shipping Insurance:</span>
                                    <span>${orderSummary.shippingInsurance?.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="summary-line">
                                <span>Tax:</span>
                                <span>${orderSummary.tax?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="summary-line total">
                                <span>Total:</span>
                                <span>${orderSummary.total?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="processing-overlay">
                    <div className="processing-content">
                        <div className="loading-spinner"></div>
                        <p>Processing your order...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// PropTypes for better type checking
JewelryCheckout.propTypes = {
    jewelryItem: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string
    }),
    bidAmount: PropTypes.number,
    onCheckoutComplete: PropTypes.func
};

// Default props to prevent errors
JewelryCheckout.defaultProps = {
    jewelryItem: {
        id: 'temp-id',
        title: 'Jewelry Item',
        description: 'Premium jewelry piece',
        image: null
    },
    bidAmount: 0,
    onCheckoutComplete: () => { }
};

export default JewelryCheckout;