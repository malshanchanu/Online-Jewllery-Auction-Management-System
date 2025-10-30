import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import "./JewelryInvoice.css";

const JewelryInvoice = ({
    invoiceData = {},
    onDownload,
    onPrint,
    onEmail
}) => {
    const invoiceRef = useRef();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [isEmailing, setIsEmailing] = useState(false);

    // Default invoice data structure
    const defaultInvoice = {
        invoiceNumber: 'INV-' + Date.now(),
        invoiceDate: new Date().toLocaleDateString(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        seller: {
            name: 'CrystalCrown Jewelry Auctions',
            address: '123 Diamond Street, Luxury District',
            city: 'New York, NY 10001',
            phone: '+1 (555) 123-4567',
            email: 'sales@crystalcrown.com'
        },
        buyer: {
            name: 'John Doe',
            address: '456 Buyer Street',
            city: 'Customer City, ST 12345',
            phone: '+1 (555) 987-6543',
            email: 'buyer@example.com'
        },
        jewelryItem: {
            title: 'Diamond Engagement Ring',
            description: '1.5 Carat Round Cut Diamond, 18K White Gold',
            category: 'Rings',
            metalType: '18K White Gold',
            gemstone: 'Diamond',
            carat: '1.5ct',
            clarity: 'VS1',
            color: 'F',
            cut: 'Round Brilliant',
            certification: 'GIA Certified',
            condition: 'Excellent',
            auctionId: 'AUC-2025-001'
        },
        payment: {
            bidAmount: 5000.00,
            buyersPremium: 500.00,
            tax: 412.50,
            shipping: 25.00,
            insurance: 50.00,
            total: 5987.50,
            currency: 'USD',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-' + Date.now(),
            paymentDate: new Date().toLocaleDateString()
        }
    };

    const invoice = { ...defaultInvoice, ...invoiceData };

    // Currency formatting utility
    const formatCurrency = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            // Try to use jspdf for PDF generation if available
            try {
                // Dynamic imports for PDF generation libraries
                const { jsPDF } = await import('jspdf');
                const html2canvas = await import('html2canvas');

                const canvas = await html2canvas.default(invoiceRef.current);
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
            } catch (pdfError) {
                console.warn('PDF libraries not available, falling back to text download');
                // Fallback to text version
                const invoiceText = generateInvoiceText(invoice);
                const blob = new Blob([invoiceText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Invoice-${invoice.invoiceNumber}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }

            if (onDownload) {
                onDownload(invoice);
            }
        } catch (error) {
            console.error('Download error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePrint = () => {
        setIsPrinting(true);
        if (onPrint) {
            onPrint(invoice);
        }
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 500);
    };

    const handleEmail = async () => {
        setIsEmailing(true);
        try {
            if (onEmail) {
                await onEmail(invoice);
            }
            // Open email client with pre-filled content
            const subject = `Invoice ${invoice.invoiceNumber} - Jewelry Purchase`;
            const body = `Please find attached your jewelry purchase invoice.\n\nInvoice Number: ${invoice.invoiceNumber}\nTotal Amount: ${formatCurrency(invoice.payment.total, invoice.payment.currency)}`;
            window.location.href = `mailto:${invoice.buyer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } catch (error) {
            console.error('Email error:', error);
        } finally {
            setIsEmailing(false);
        }
    };

    const generateInvoiceText = (invoiceData) => {
        return `
CRYSTALCROWN JEWELRY AUCTIONS
INVOICE ${invoiceData.invoiceNumber}

Date: ${invoiceData.invoiceDate}
Due Date: ${invoiceData.dueDate}

SELLER:
${invoiceData.seller.name}
${invoiceData.seller.address}
${invoiceData.seller.city}
Phone: ${invoiceData.seller.phone}
Email: ${invoiceData.seller.email}

BUYER:
${invoiceData.buyer.name}
${invoiceData.buyer.address}
${invoiceData.buyer.city}
Phone: ${invoiceData.buyer.phone}
Email: ${invoiceData.buyer.email}

JEWELRY ITEM:
${invoiceData.jewelryItem.title}
${invoiceData.jewelryItem.description}
Category: ${invoiceData.jewelryItem.category}
Metal: ${invoiceData.jewelryItem.metalType}
Gemstone: ${invoiceData.jewelryItem.gemstone}
Certification: ${invoiceData.jewelryItem.certification}
Condition: ${invoiceData.jewelryItem.condition}
Auction ID: ${invoiceData.jewelryItem.auctionId}

PAYMENT BREAKDOWN:
Winning Bid: ${formatCurrency(invoiceData.payment.bidAmount, invoiceData.payment.currency)}
Buyer's Premium: ${formatCurrency(invoiceData.payment.buyersPremium, invoiceData.payment.currency)}
Tax: ${formatCurrency(invoiceData.payment.tax, invoiceData.payment.currency)}
Shipping: ${formatCurrency(invoiceData.payment.shipping, invoiceData.payment.currency)}
Insurance: ${formatCurrency(invoiceData.payment.insurance, invoiceData.payment.currency)}
TOTAL: ${formatCurrency(invoiceData.payment.total, invoiceData.payment.currency)}

Payment Method: ${invoiceData.payment.paymentMethod}
Transaction ID: ${invoiceData.payment.transactionId}
Payment Date: ${invoiceData.payment.paymentDate}

Thank you for your purchase!
    `;
    };

    return (
        <ErrorBoundary>
            <div className="jewelry-invoice">
                <div className="invoice-actions">
                    <h2>💎 Jewelry Purchase Invoice</h2>
                    <div className="action-buttons">
                        <button
                            className="download-btn"
                            onClick={handleDownload}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">📄</span>
                                    <span>Download PDF</span>
                                </>
                            )}
                        </button>
                        <button
                            className="print-btn"
                            onClick={handlePrint}
                            disabled={isPrinting}
                        >
                            {isPrinting ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Printing...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">🖨️</span>
                                    <span>Print</span>
                                </>
                            )}
                        </button>
                        <button
                            className="email-btn"
                            onClick={handleEmail}
                            disabled={isEmailing}
                        >
                            {isEmailing ? (
                                <>
                                    <div className="spinner"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span className="btn-icon">📧</span>
                                    <span>Email</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div ref={invoiceRef} className="invoice-content">
                    {/* Invoice Header */}
                    <div className="invoice-header">
                        <div className="company-info">
                            <h1>✨ CrystalCrown</h1>
                            <p className="company-tagline">Premium Jewelry Auctions</p>
                            <div className="company-details">
                                <p>{invoice.seller.address}</p>
                                <p>{invoice.seller.city}</p>
                                <p>Phone: {invoice.seller.phone}</p>
                                <p>Email: {invoice.seller.email}</p>
                            </div>
                        </div>
                        <div className="invoice-details">
                            <h2>INVOICE</h2>
                            <div className="invoice-meta">
                                <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                                <p><strong>Date:</strong> {invoice.invoiceDate}</p>
                                <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Billing Information */}
                    <div className="billing-section">
                        <div className="bill-to">
                            <h3>Bill To:</h3>
                            <div className="buyer-details">
                                <p><strong>{invoice.buyer.name}</strong></p>
                                <p>{invoice.buyer.address}</p>
                                <p>{invoice.buyer.city}</p>
                                <p>Phone: {invoice.buyer.phone}</p>
                                <p>Email: {invoice.buyer.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Jewelry Item Details */}
                    <div className="item-section">
                        <h3>💎 Jewelry Item Details</h3>
                        <div className="item-card">
                            <div className="item-header">
                                <h4>{invoice.jewelryItem.title}</h4>
                                <p className="item-description">{invoice.jewelryItem.description}</p>
                            </div>
                            <div className="item-specifications">
                                <div className="spec-row">
                                    <span className="spec-label">Category:</span>
                                    <span className="spec-value">{invoice.jewelryItem.category}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Metal Type:</span>
                                    <span className="spec-value">{invoice.jewelryItem.metalType}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Gemstone:</span>
                                    <span className="spec-value">{invoice.jewelryItem.gemstone}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Carat:</span>
                                    <span className="spec-value">{invoice.jewelryItem.carat}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Clarity:</span>
                                    <span className="spec-value">{invoice.jewelryItem.clarity}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Color:</span>
                                    <span className="spec-value">{invoice.jewelryItem.color}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Cut:</span>
                                    <span className="spec-value">{invoice.jewelryItem.cut}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Certification:</span>
                                    <span className="spec-value">{invoice.jewelryItem.certification}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Condition:</span>
                                    <span className="spec-value">{invoice.jewelryItem.condition}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Auction ID:</span>
                                    <span className="spec-value">{invoice.jewelryItem.auctionId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="payment-section">
                        <h3>💰 Payment Breakdown</h3>
                        <div className="payment-table">
                            <div className="payment-row">
                                <span className="payment-label">Winning Bid Amount:</span>
                                <span className="payment-value">
                                    {formatCurrency(invoice.payment.bidAmount, invoice.payment.currency)}
                                </span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">Buyer's Premium (10%):</span>
                                <span className="payment-value">
                                    {formatCurrency(invoice.payment.buyersPremium, invoice.payment.currency)}
                                </span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">Tax:</span>
                                <span className="payment-value">
                                    {formatCurrency(invoice.payment.tax, invoice.payment.currency)}
                                </span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">Shipping:</span>
                                <span className="payment-value">
                                    {formatCurrency(invoice.payment.shipping, invoice.payment.currency)}
                                </span>
                            </div>
                            <div className="payment-row">
                                <span className="payment-label">Insurance:</span>
                                <span className="payment-value">
                                    {formatCurrency(invoice.payment.insurance, invoice.payment.currency)}
                                </span>
                            </div>
                            <div className="payment-row total-row">
                                <span className="payment-label"><strong>TOTAL AMOUNT:</strong></span>
                                <span className="payment-value total-amount">
                                    <strong>
                                        {formatCurrency(invoice.payment.total, invoice.payment.currency)}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="transaction-section">
                        <h3>🔖 Transaction Details</h3>
                        <div className="transaction-info">
                            <div className="transaction-row">
                                <span className="transaction-label">Payment Method:</span>
                                <span className="transaction-value">{invoice.payment.paymentMethod}</span>
                            </div>
                            <div className="transaction-row">
                                <span className="transaction-label">Transaction ID:</span>
                                <span className="transaction-value">{invoice.payment.transactionId}</span>
                            </div>
                            <div className="transaction-row">
                                <span className="transaction-label">Payment Date:</span>
                                <span className="transaction-value">{invoice.payment.paymentDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="invoice-footer">
                        <div className="terms">
                            <h4>Terms & Conditions:</h4>
                            <ul>
                                <li>All sales are final for auction items</li>
                                <li>Items must be inspected within 48 hours of delivery</li>
                                <li>Shipping insurance is recommended for high-value items</li>
                                <li>Returns accepted only for misrepresented items</li>
                                <li>Payment due within 30 days of invoice date</li>
                            </ul>
                        </div>
                        <div className="footer-note">
                            <p>Thank you for choosing CrystalCrown Jewelry Auctions!</p>
                            <p className="contact-info">
                                For questions: <strong>{invoice.seller.email}</strong> | <strong>{invoice.seller.phone}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Invoice Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback">
                    <h2>Something went wrong with the invoice display.</h2>
                    <p>Please try refreshing the page or contact support if the problem persists.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

// PropTypes validation
JewelryInvoice.propTypes = {
    invoiceData: PropTypes.shape({
        invoiceNumber: PropTypes.string,
        invoiceDate: PropTypes.string,
        dueDate: PropTypes.string,
        seller: PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
            city: PropTypes.string,
            phone: PropTypes.string,
            email: PropTypes.string
        }),
        buyer: PropTypes.shape({
            name: PropTypes.string,
            address: PropTypes.string,
            city: PropTypes.string,
            phone: PropTypes.string,
            email: PropTypes.string
        }),
        jewelryItem: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            category: PropTypes.string,
            metalType: PropTypes.string,
            gemstone: PropTypes.string,
            carat: PropTypes.string,
            clarity: PropTypes.string,
            color: PropTypes.string,
            cut: PropTypes.string,
            certification: PropTypes.string,
            condition: PropTypes.string,
            auctionId: PropTypes.string
        }),
        payment: PropTypes.shape({
            bidAmount: PropTypes.number,
            buyersPremium: PropTypes.number,
            tax: PropTypes.number,
            shipping: PropTypes.number,
            insurance: PropTypes.number,
            total: PropTypes.number,
            currency: PropTypes.string,
            paymentMethod: PropTypes.string,
            transactionId: PropTypes.string,
            paymentDate: PropTypes.string
        })
    }),
    onDownload: PropTypes.func,
    onPrint: PropTypes.func,
    onEmail: PropTypes.func
};

JewelryInvoice.defaultProps = {
    invoiceData: {},
    onDownload: () => { },
    onPrint: () => { },
    onEmail: () => { }
};

export default JewelryInvoice;