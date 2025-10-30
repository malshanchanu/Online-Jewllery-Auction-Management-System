# Payment Module Documentation

## Overview

The payment module handles all financial transactions for the CrystalCrown Jewelry Auction System, including payment processing, insurance options, and invoice generation.

## Components Overview

### 1. JewelryCheckout (`JewelryCheckout.jsx`)

**Purpose:** Main checkout wizard that guides users through the complete purchase flow.

**Features:**
- Multi-step process (Shipping → Payment → Insurance → Confirmation)
- Real-time order calculations
- Integration with all payment methods
- Responsive design for all devices

### 2. PaymentMethod (`PaymentMethod.jsx`)

**Purpose:** UI for selecting and managing payment methods.

**Features:**
- Saved payment methods display
- Add new payment method form
- Payment method selection with visual feedback
- Security features display

### 3. PayPalIntegration (`PayPalIntegration.jsx`)

**Purpose:** Handles PayPal payment processing.

**Features:**
- PayPal button integration
- Payment status tracking (processing, success, error)
- Order summary display
- Secure payment processing

### 4. StripeIntegration (`StripeIntegration.jsx`)

**Purpose:** Handles Stripe credit card payment processing.

**Features:**
- Stripe Elements for secure card input
- Client-side validation
- Payment processing via Stripe API
- Test mode with example card numbers

### 5. InsuranceOptions (`InsuranceOptions.jsx`)

**Purpose:** Allows users to select jewelry insurance options.

**Features:**
- Multiple insurance tiers based on item value
- Price calculations (1-2% of item value)
- Visual selection interface

### 6. ShippingInsurance (`ShippingInsurance.jsx`)

**Purpose:** Offers shipping protection options.

**Features:**
- Three coverage levels (Standard, Advanced, None)
- Clear pricing and coverage descriptions
- Selection state management

### 7. PaymentHistory (`PaymentHistory.jsx`)

**Purpose:** Displays user's transaction history.

**Features:**
- Filtering by status and payment method
- Sorting by various columns
- Transaction details display
- Export capabilities

### 8. JewelryInvoice (`JewelryInvoice.jsx`)

**Purpose:** Generates professional invoices for purchases.

**Features:**
- Download as PDF functionality
- Print optimization
- Email invoice option
- Detailed item and payment breakdown

## Integration Points

### Environment Variables Required

```env
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
REACT_APP_API_BASE=http://localhost:5001
REACT_APP_API_URL=http://localhost:5001/api
```

### Mock Service Integration

All components currently use the mockService for:
- Payment processing simulation
- Certificate management
- Email notifications
- Payment history data

## API Endpoints Needed for Production

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/payments/process` | POST | Process payments |
| `/api/payments/history` | GET | Retrieve payment history |
| `/api/invoices/generate` | POST | Generate invoices |
| `/api/insurance/calculate` | POST | Calculate insurance costs |

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **Create .env file with required variables**

3. **Import and use components in your routes:**
   ```jsx
   <Route path="/checkout" element={<JewelryCheckout />} />
   <Route path="/payment-method" element={<PaymentMethod />} />
   ```

## Props Documentation

### JewelryCheckout Props

```jsx
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
```

### PaymentMethod Props

```jsx
PaymentMethod.propTypes = {
  totalAmount: PropTypes.number,
  onPaymentSuccess: PropTypes.func,
  onPaymentError: PropTypes.func
};
```

## State Management

The payment module uses React's `useState` and `useEffect` hooks for state management. For larger applications, consider integrating with Redux or Context API for more complex state scenarios.

## Security Considerations

- All payment data is processed through certified payment gateways (Stripe/PayPal)
- No sensitive payment data is stored locally
- SSL encryption is required for all transactions
- PCI DSS compliance is maintained through third-party processors

## Testing

Components include:
- Unit tests for individual functions
- Integration tests for payment flows
- Mock service simulations for development
- Error handling for failed transactions

## Browser Compatibility

**Supported browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Components are lazy-loaded for better initial load time
- Images are optimized for fast loading
- Payment forms are optimized for mobile devices

## Future Enhancements

- **Additional Payment Methods:** Apple Pay, Google Pay
- **Currency Support:** Multiple currency handling
- **Subscription Payments:** Recurring payment support
- **Advanced Fraud Detection:** Additional security layers
- **Payment Analytics:** Dashboard with payment metrics

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-08-25 | Initial release of payment module |
| 1.1.0 | 2024-09-15 | Added insurance options component |
| 1.2.0 | 2024-10-01 | Enhanced invoice generation |

## Related Documents

- API Integration Guide
- Deployment Checklist
- Testing Strategy

## Support

For issues related to the payment module, contact:

- **Frontend Team Lead:** Member 6
- **Email:** frontend@crystalcrown.com
- **Slack Channel:** #frontend-payments