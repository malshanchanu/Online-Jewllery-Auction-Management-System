// src/services/mockService.js - COMPLETELY FIXED VERSION
export const mockService = {
    // Payment processing methods
    async processPayment(amount, method, jewelryItem) {
        console.log(`Simulating ${method} payment of $${amount} for ${jewelryItem?.title}`);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate occasional failure (15% chance)
        if (Math.random() < 0.15) {
            throw new Error(`Payment failed: ${method} transaction declined`);
        }

        return {
            success: true,
            transactionId: `mock_${method}_${Date.now()}`,
            amount: amount,
            method: method,
            jewelryItemId: jewelryItem?.id,
            jewelryTitle: jewelryItem?.title,
            timestamp: new Date().toISOString(),
            status: 'completed',
            message: 'Payment simulation successful - ready for real integration'
        };
    },

    // Certification methods - FIXED with substring() instead of substr()
    async uploadCertificate(file, jewelryItemId) {
        console.log(`Simulating certificate upload for jewelry: ${jewelryItemId}`);
        console.log(`File: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const fileType = file.type.includes('pdf') ? 'PDF' : 'Image';

        // Simulate occasional upload failure (10% chance)
        if (Math.random() < 0.1) {
            throw new Error('Certificate upload failed: File format not supported');
        }

        return {
            success: true,
            fileId: `cert_${Date.now()}`,
            fileName: file.name,
            fileType: fileType,
            fileSize: file.size,
            jewelryItemId: jewelryItemId,
            uploadDate: new Date().toISOString(),
            message: "Certificate uploaded successfully via mock service",
            // FIXED: Replaced deprecated substr() with substring()
            certificateNumber: `CERT-${Math.random().toString(36).substring(2, 11).toUpperCase()}`
        };
    },

    async getCertifications(jewelryItemId) {
        console.log(`Fetching certifications for jewelry: ${jewelryItemId}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate occasional fetch failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error('Failed to fetch certificates: Network error');
        }

        // Return mock certification data
        return [
            {
                id: 1,
                name: "GIA Diamond Certificate.pdf",
                type: "GIA",
                certificateNumber: "GIA123456789",
                date: "2024-01-15",
                jewelryItemId: jewelryItemId
            },
            {
                id: 2,
                name: "Insurance Appraisal.docx",
                type: "Appraisal",
                appraisedValue: "$5,200.00",
                date: "2024-02-20",
                jewelryItemId: jewelryItemId
            },
            {
                id: 3,
                name: "AGS Gemstone Report.png",
                type: "AGS",
                certificateNumber: "AGS987654321",
                date: "2024-03-10",
                jewelryItemId: jewelryItemId
            }
        ];
    },

    async verifyCertificate(certificateId, certificateNumber) {
        console.log(`Verifying certificate: ${certificateId}`);
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simulate verification failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error('Certificate verification failed: Invalid certificate');
        }

        return {
            success: true,
            certificateId: certificateId,
            certificateNumber: certificateNumber,
            verified: true,
            verificationDate: new Date().toISOString(),
            message: "Certificate verified successfully"
        };
    },

    // Email and payment history methods
    async sendConfirmationEmail(orderData, email) {
        console.log(`Simulating email to: ${email}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            email: email,
            orderId: orderData.transactionId,
            subject: `Order Confirmation #${orderData.transactionId}`,
            message: "Thank you for your jewelry purchase!",
            timestamp: new Date().toISOString()
        };
    },

    async getPaymentHistory(userId) {
        console.log(`Fetching payment history for user: ${userId}`);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate fetch failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error('Failed to fetch payment history: Database error');
        }

        return [
            {
                id: 1,
                transactionId: "mock_stripe_123456",
                amount: 299.99,
                method: "stripe",
                status: "completed",
                date: "2024-08-25T10:30:00Z",
                jewelryItem: "Diamond Ring",
                jewelryId: "item_001"
            },
            {
                id: 2,
                transactionId: "mock_paypal_789012",
                amount: 450.50,
                method: "paypal",
                status: "completed",
                date: "2024-08-20T14:22:00Z",
                jewelryItem: "Gold Necklace",
                jewelryId: "item_002"
            },
            {
                id: 3,
                transactionId: "mock_card_345678",
                amount: 1200.00,
                method: "credit card",
                status: "pending",
                date: "2024-08-22T09:15:00Z",
                jewelryItem: "Sapphire Bracelet",
                jewelryId: "item_003"
            }
        ];
    },

    // Stripe payment processing
    async processStripePayment(paymentData) {
        console.log("Processing Stripe payment:", paymentData);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate occasional failure (10% chance)
        if (Math.random() < 0.1) {
            throw new Error("Stripe payment failed: Insufficient funds");
        }

        return {
            success: true,
            paymentId: `pi_${Date.now()}`,
            amount: paymentData.amount,
            currency: paymentData.currency || 'usd',
            status: 'succeeded',
            paymentMethod: paymentData.paymentMethodId ? `pm_${paymentData.paymentMethodId}` : 'card',
            timestamp: new Date().toISOString()
        };
    },

    // PayPal payment processing
    async processPayPalPayment(paymentData) {
        console.log("Processing PayPal payment:", paymentData);
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Simulate occasional failure (5% chance)
        if (Math.random() < 0.05) {
            throw new Error("PayPal payment failed: Payment declined");
        }

        return {
            success: true,
            paymentId: `pay_${Date.now()}`,
            amount: paymentData.amount,
            currency: paymentData.currency || 'USD',
            status: 'COMPLETED',
            payerEmail: paymentData.payerEmail || 'buyer@example.com',
            timestamp: new Date().toISOString()
        };
    },

    // Additional utility methods for better integration
    async validatePaymentMethod(methodData) {
        console.log("Validating payment method:", methodData);
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            valid: true,
            message: "Payment method validated successfully"
        };
    },

    async generateInvoice(paymentData) {
        console.log("Generating invoice for:", paymentData);
        await new Promise(resolve => setTimeout(resolve, 800));

        return {
            invoiceNumber: `INV-${Date.now()}`,
            invoiceDate: new Date().toISOString(),
            amount: paymentData.amount,
            currency: paymentData.currency,
            downloadUrl: "#",
            viewUrl: "#"
        };
    }
};

// Default export for easier imports
export default mockService;