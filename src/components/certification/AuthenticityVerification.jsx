import React from "react";
import PropTypes from "prop-types";
import "./CertificateStyles.css";

export default function AuthenticityVerification({ verificationData }) {
    const data = verificationData || {
        id: "AUTH-112233",
        item: "Platinum Engagement Ring",
        status: "Verified Genuine",
        verifiedBy: "Certified Gemologist",
        date: "2025-08-25"
    };

    return (
        <div className="certificate-page" role="region" aria-label="Authenticity Verification">
            <h2>Authenticity Verification</h2>
            <p>
                <strong>Authenticity Verification</strong> confirms that the jewelry item is
                genuine and not counterfeit.
            </p>
            <div className="cert-box">
                <h4>Verification Details</h4>
                <ul>
                    <li>Verification ID: {data.id}</li>
                    <li>Jewelry Item: {data.item}</li>
                    <li>Authenticity: {data.status}</li>
                    <li>Verified By: {data.verifiedBy}</li>
                    <li>Date: {data.date}</li>
                </ul>
            </div>
        </div>
    );
}

AuthenticityVerification.propTypes = {
    verificationData: PropTypes.shape({
        id: PropTypes.string,
        item: PropTypes.string,
        status: PropTypes.string,
        verifiedBy: PropTypes.string,
        date: PropTypes.string
    })
};