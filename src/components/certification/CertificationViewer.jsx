// src/components/certification/CertificationViewer.jsx - FIXED VERSION
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { mockService } from "../../services/mockService";
import "./CertificationViewer.css";

export default function CertificationViewer({ fetchCertificates, jewelryItemId }) {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCertificates = async () => {
            try {
                setLoading(true);
                setError(null);

                if (fetchCertificates) {
                    const data = await fetchCertificates();
                    setCertificates(data);
                } else {
                    // Use mockService to get certificates
                    const certData = await mockService.getCertifications(jewelryItemId);
                    setCertificates(certData || []);
                }
            } catch (err) {
                console.error("Error loading certificates:", err);
                setError("Failed to load certificates. Please try again.");
                // Fallback to demo data
                const demoData = [
                    {
                        id: 1,
                        name: "Diamond Ring Certificate.pdf",
                        type: "GIA",
                        date: "2024-01-15",
                        certificateNumber: "GIA123456789"
                    },
                    {
                        id: 2,
                        name: "Gold Necklace Certificate.png",
                        type: "Appraisal",
                        date: "2024-02-20",
                        appraisedValue: "$5,000"
                    }
                ];
                setCertificates(demoData);
            } finally {
                setLoading(false);
            }
        };

        loadCertificates();
    }, [fetchCertificates, jewelryItemId]);

    const handleDownload = async (certificateId, fileName) => {
        try {
            console.log("Downloading certificate:", certificateId);
            // In real app, this would call your backend API
            alert(`Downloading: ${fileName}`);
        } catch (err) {
            setError("Download failed. Please try again.");
        }
    };

    const handleVerify = async (certificateId, type) => {
        try {
            console.log(`Verifying ${type} certificate:`, certificateId);
            // This would call a verification API in a real application
            alert(`Verifying ${type} certificate ${certificateId}`);
        } catch (err) {
            setError("Verification failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="cert-viewer">
                <h2>View Certifications</h2>
                <div className="loading-spinner">Loading certificates...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cert-viewer">
                <h2>View Certifications</h2>
                <div className="error-message">⚠️ {error}</div>
                <button onClick={() => window.location.reload()} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="cert-viewer">
            <h2>View Certifications</h2>

            {certificates.length === 0 ? (
                <div className="no-certificates">
                    <p>No certificates found.</p>
                    <p>Upload certificates to get started.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Certificate Name</th>
                                <th>Type</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map((cert) => (
                                <tr key={cert.id}>
                                    <td className="file-name">{cert.name}</td>
                                    <td className="cert-type">{cert.type || "Unknown"}</td>
                                    <td>
                                        {cert.certificateNumber && `#${cert.certificateNumber}`}
                                        {cert.appraisedValue && `Value: ${cert.appraisedValue}`}
                                    </td>
                                    <td className="cert-date">{cert.date || "N/A"}</td>
                                    <td className="actions">
                                        <button
                                            onClick={() => handleVerify(cert.id, cert.type)}
                                            className="view-link"
                                            title="Verify Certificate"
                                        >
                                            ✅ Verify
                                        </button>
                                        <button
                                            onClick={() => handleDownload(cert.id, cert.name)}
                                            className="download-button"
                                            title="Download Certificate"
                                        >
                                            ⬇️ Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="certificate-stats">
                <p>Total certificates: <strong>{certificates.length}</strong></p>
                {jewelryItemId && (
                    <p>For jewelry item: <strong>{jewelryItemId}</strong></p>
                )}
            </div>
        </div>
    );
}

CertificationViewer.propTypes = {
    fetchCertificates: PropTypes.func,
    jewelryItemId: PropTypes.string
};