import React, { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { mockService } from "../../services/mockService";
import "./PaymentHistory.css";

const PaymentHistory = ({ userId }) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: 'all',
        method: 'all',
        dateRange: 'all'
    });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // Fetch payment history from API using mockService
    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                setLoading(true);
                setError(null);

                // Use mockService to get payment history
                const paymentData = await mockService.getPaymentHistory(userId);
                setPayments(paymentData || []);

            } catch (err) {
                console.error("Payment history error:", err);
                setError("Failed to load payment history. Please try again.");
                // Fallback to demo data
                const demoData = [
                    {
                        id: 1,
                        date: "2025-08-20",
                        method: "PayPal",
                        amount: 150.00,
                        currency: "USD",
                        status: "completed",
                        invoiceId: "INV-001",
                        jewelryItem: "Diamond Ring",
                        auctionId: "AUC-2025-001"
                    },
                    {
                        id: 2,
                        date: "2025-08-21",
                        method: "Stripe",
                        amount: 320.00,
                        currency: "USD",
                        status: "pending",
                        invoiceId: "INV-002",
                        jewelryItem: "Sapphire Necklace",
                        auctionId: "AUC-2025-002"
                    },
                    {
                        id: 3,
                        date: "2025-08-23",
                        method: "Credit Card",
                        amount: 85.50,
                        currency: "USD",
                        status: "completed",
                        invoiceId: "INV-003",
                        jewelryItem: "Gold Bracelet",
                        auctionId: "AUC-2025-003"
                    }
                ];
                setPayments(demoData);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [userId]);

    // Filter and sort payments
    const filteredAndSortedPayments = useMemo(() => {
        let result = [...payments];

        // Status filter
        if (filters.status !== 'all') {
            result = result.filter(payment => payment.status === filters.status);
        }

        // Method filter
        if (filters.method !== 'all') {
            result = result.filter(payment => payment.method === filters.method);
        }

        // Sort payments
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [payments, filters, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const viewInvoice = (invoiceId) => {
        alert(`Viewing invoice: ${invoiceId}`);
    };

    if (loading) {
        return (
            <div className="payment-history">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading payment history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-history">
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-history">
            <div className="payment-header">
                <h2>💎 Payment History</h2>
                <p>Review your jewelry auction payments and invoices</p>
            </div>

            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="status-filter">Status:</label>
                    <select
                        id="status-filter"
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="method-filter">Method:</label>
                    <select
                        id="method-filter"
                        value={filters.method}
                        onChange={(e) => handleFilterChange('method', e.target.value)}
                    >
                        <option value="all">All Methods</option>
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                        <option value="credit card">Credit Card</option>
                        <option value="bank transfer">Bank Transfer</option>
                    </select>
                </div>
            </div>

            <div className="payment-table-container">
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('date')}>
                                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('jewelryItem')}>
                                Item {sortConfig.key === 'jewelryItem' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('method')}>
                                Method {sortConfig.key === 'method' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('amount')}>
                                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedPayments.length > 0 ? (
                            filteredAndSortedPayments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{formatDate(payment.date)}</td>
                                    <td className="item-name">{payment.jewelryItem}</td>
                                    <td>
                                        <span className={`payment-method ${payment.method.toLowerCase().replace(' ', '-')}`}>
                                            {payment.method}
                                        </span>
                                    </td>
                                    <td className="amount">{formatCurrency(payment.amount, payment.currency || 'USD')}</td>
                                    <td>
                                        <span className={`status-badge ${payment.status}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="view-invoice-btn"
                                            onClick={() => viewInvoice(payment.invoiceId || payment.transactionId)}
                                        >
                                            View Invoice
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-payments">
                                    No payments found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="payment-summary">
                <div className="summary-item">
                    <span className="summary-label">Total Payments:</span>
                    <span className="summary-value">
                        {formatCurrency(
                            filteredAndSortedPayments.reduce((sum, payment) => sum + payment.amount, 0),
                            "USD"
                        )}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Number of Transactions:</span>
                    <span className="summary-value">{filteredAndSortedPayments.length}</span>
                </div>
            </div>
        </div>
    );
};

PaymentHistory.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PaymentHistory;