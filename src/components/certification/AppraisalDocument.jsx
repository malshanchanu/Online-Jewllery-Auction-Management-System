import React from "react";
import "./CertificateStyles.css";

export default function AppraisalDocument() {
    return (
        <div className="certificate-page">
            <h2>Appraisal Document</h2>
            <p>
                The <strong>Appraisal Document</strong> provides an estimated value of the jewelry
                for insurance or resale purposes.
            </p>
            <div className="cert-box">
                <h4>Example Details</h4>
                <ul>
                    <li>Appraisal ID: APR-456789</li>
                    <li>Jewelry Type: Gold Necklace</li>
                    <li>Estimated Value: $5,000</li>
                    <li>Appraiser: John Doe (Certified Appraiser)</li>
                    <li>Date: 2025-08-25</li>
                </ul>
            </div>
        </div>
    );
}
