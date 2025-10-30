import React from "react";
import PropTypes from "prop-types";
import "./CertificateStyles.css";

export default function GIACertificate({ certificateData, onVerify }) {
    const data = certificateData || {
        id: "GIA-123456",
        carat: "1.5 ct",
        clarity: "VS1",
        color: "D",
        cut: "Excellent",
        shape: "Round",
        measurements: "6.5x6.5x4.0mm",
        reportDate: "2024-01-15",
        reportNumber: "1234567890"
    };

    return (
        <div className="certificate-page" role="region" aria-label="GIA Certificate">
            <h2>GIA Gemological Institute of America Certificate</h2>
            <p className="certificate-description">
                The <strong>GIA Certificate</strong> provides a detailed grading report of diamonds
                and gemstones including carat weight, cut, clarity, and color grading.
            </p>

            <div className="cert-box">
                <h4>📋 Certificate Details</h4>
                <div className="certificate-grid">
                    <div className="certificate-item">
                        <span className="label">Report Number:</span>
                        <span className="value">{data.id}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Carat Weight:</span>
                        <span className="value">{data.carat}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Clarity Grade:</span>
                        <span className="value">{data.clarity}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Color Grade:</span>
                        <span className="value">{data.color}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Cut Grade:</span>
                        <span className="value">{data.cut}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Shape:</span>
                        <span className="value">{data.shape}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Measurements:</span>
                        <span className="value">{data.measurements}</span>
                    </div>
                    <div className="certificate-item">
                        <span className="label">Report Date:</span>
                        <span className="value">{data.reportDate}</span>
                    </div>
                </div>

                {onVerify && (
                    <button
                        onClick={() => onVerify(data)}
                        className="verify-button"
                    >
                        ✅ Verify Authenticity
                    </button>
                )}
            </div>

            <div className="certificate-footer">
                <p>ℹ️ This certificate can be verified on the official GIA website using the report number.</p>
            </div>
        </div>
    );
}

GIACertificate.propTypes = {
    certificateData: PropTypes.shape({
        id: PropTypes.string,
        carat: PropTypes.string,
        clarity: PropTypes.string,
        color: PropTypes.string,
        cut: PropTypes.string,
        shape: PropTypes.string,
        measurements: PropTypes.string,
        reportDate: PropTypes.string,
        reportNumber: PropTypes.string
    }),
    onVerify: PropTypes.func
};