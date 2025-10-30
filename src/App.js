import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Site chrome
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";

// Pages
import HomePage from "./Pages/HomePage";
import JewelryListPage from "./Pages/JewelryListPage";
import JewelryDetails from "./Pages/JewelryDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

// Payments
import JewelryCheckout from "./components/payment/JewelryCheckout";
import PaymentMethod from "./components/payment/PaymentMethod";
import PayPalIntegration from "./components/payment/PayPalIntegration";
import StripeIntegration from "./components/payment/StripeIntegration";
import PaymentHistory from "./components/payment/PaymentHistory";
import InsuranceOptions from "./components/payment/InsuranceOptions";
import ShippingInsurance from "./components/payment/ShippingInsurance";
import JewelryInvoice from "./components/payment/JewelryInvoice";

// Certification
import CertificationUpload from "./components/certification/CertificationUpload";
import CertificationViewer from "./components/certification/CertificationViewer";
import GIACertificate from "./components/certification/GIACertificate";
import AGSCertificate from "./components/certification/AGSCertificate";
import AppraisalDocument from "./components/certification/AppraisalDocument";
import AuthenticityVerification from "./components/certification/AuthenticityVerification";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, { AdminRoute } from "./components/ProtectedRoute";
// Admin
import AdminDashboard from "./Pages/AdminDashboard";
import AdminSetup from "./Pages/AdminSetup";
import UserManagement from "./Pages/admin/UserManagement";
import ProductManagement from "./Pages/admin/ProductManagement";
import OrderManagement from "./Pages/admin/OrderManagement";
import Analytics from "./Pages/admin/Analytics";
import BidManagement from "./Pages/admin/BidManagement";
import MyBids from "./Pages/MyBids";
import Wishlist from "./Pages/Wishlist";
import { ThemeProvider } from "./context/ThemeContext";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

function StripeUnavailable({ children }) {
    return (
        <div style={{ padding: 24 }}>
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 16,
                color: 'var(--text)'
            }}>
                <h3 style={{ marginTop: 0 }}>Stripe is not configured</h3>
                <p style={{ color: 'var(--muted)' }}>
                    Missing environment variable <code>REACT_APP_STRIPE_PUBLISHABLE_KEY</code>. Please set it and reload.
                </p>
            </div>
            {children || null}
        </div>
    );
}

function NotFound() {
    return (
        <div className="not-found-page">
            <style>{`
                .not-found-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--gradient-dark);
                    color: var(--text);
                    text-align: center;
                    padding: 2rem;
                }
                .not-found-content {
                    max-width: 600px;
                    animation: fadeIn 1s ease;
                }
                .not-found-title {
                    font-size: 6rem;
                    font-weight: 700;
                    background: var(--gradient-gold);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                    animation: float 3s ease-in-out infinite;
                }
                .not-found-subtitle {
                    font-size: 1.5rem;
                    color: var(--muted);
                    margin-bottom: 2rem;
                }
                .not-found-description {
                    font-size: 1.1rem;
                    color: var(--text-secondary);
                    margin-bottom: 3rem;
                    line-height: 1.6;
                }
                .not-found-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                @media (max-width: 768px) {
                    .not-found-title { font-size: 4rem; }
                    .not-found-actions { flex-direction: column; align-items: center; }
                }
            `}</style>
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-description">
                    The page you're looking for seems to have vanished like a precious gem. 
                    Let's help you find your way back to our collection of luxury jewelry.
                </p>
                <div className="not-found-actions">
                    <a href="/" className="button-primary">Return Home</a>
                    <a href="/jewelry" className="button-secondary">Browse Jewelry</a>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <AnimatedBackground />
                    <div className="app-root">
                        <Navbar />
                        <main className="main-content">
                            <Routes>
                            {/* Core site pages */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/jewelry" element={<JewelryListPage />} />
                            <Route path="/jewelry/:id" element={<JewelryDetails />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/admin-setup" element={<AdminSetup />} />
                                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
                            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
                            <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
                            <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
                            <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
                            <Route path="/admin/bids" element={<AdminRoute><BidManagement /></AdminRoute>} />
            <Route path="/my-bids" element={<ProtectedRoute><MyBids /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

                            {/* Payment routes */}
                            <Route
                                path="/checkout"
                                element={
                                    stripePromise ? (
                                        <Elements stripe={stripePromise}>
                                            <JewelryCheckout />
                                        </Elements>
                                    ) : (
                                        <StripeUnavailable>
                                            <JewelryCheckout />
                                        </StripeUnavailable>
                                    )
                                }
                            />
                            <Route path="/payment-method" element={<PaymentMethod />} />
                            <Route path="/paypal" element={<PayPalIntegration />} />
                            <Route
                                path="/stripe"
                                element={
                                    stripePromise ? (
                                        <Elements stripe={stripePromise}>
                                            <StripeIntegration amount={299.99} jewelryItem={{ id: 1, title: "Diamond Ring" }} />
                                        </Elements>
                                    ) : (
                                        <StripeUnavailable />
                                    )
                                }
                            />
                            <Route path="/payment-history" element={<PaymentHistory />} />
                            <Route path="/insurance-options" element={<InsuranceOptions />} />
                            <Route path="/shipping-insurance" element={<ShippingInsurance />} />
                            <Route path="/invoice" element={<JewelryInvoice />} />

                            {/* Certification routes */}
                            <Route path="/upload-cert" element={<CertificationUpload />} />
                            <Route path="/view-cert" element={<CertificationViewer />} />
                            <Route path="/gia-certificate" element={<GIACertificate />} />
                            <Route path="/ags-certificate" element={<AGSCertificate />} />
                            <Route path="/appraisal-doc" element={<AppraisalDocument />} />
                            <Route path="/auth-verification" element={<AuthenticityVerification />} />

                                {/* 404 */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;