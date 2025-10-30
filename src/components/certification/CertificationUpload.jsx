// src/components/certification/CertificationUpload.jsx - FIXED VERSION
import React, { useState } from "react";
import PropTypes from "prop-types";
import { mockService } from "../../services/mockService";
import "./CertificationUpload.css";

export default function CertificationUpload({ onUploadSuccess, jewelryItemId }) {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(selectedFile.type)) {
                setUploadError("Please select a PDF, JPEG, or PNG file");
                return;
            }

            if (selectedFile.size > 5 * 1024 * 1024) {
                setUploadError("File size must be less than 5MB");
                return;
            }

            setFile(selectedFile);
            setUploadError("");
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            setUploadError("Please select a file before uploading.");
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            // Use mockService for certificate upload
            const uploadResult = await mockService.uploadCertificate(file, jewelryItemId);

            if (uploadResult.success) {
                if (onUploadSuccess) {
                    onUploadSuccess(uploadResult);
                }
                alert(`✅ ${uploadResult.message}: ${file.name}`);
                setFile(null);
                event.target.reset();
            } else {
                setUploadError(uploadResult.message || "Upload failed");
            }

        } catch (error) {
            console.error("Upload error:", error);
            setUploadError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="cert-upload">
            <h2>Upload Jewelry Certification</h2>
            <p className="upload-instructions">
                Upload PDF or image files (JPEG, PNG) for GIA, AGS, or appraisal certificates.
                Maximum file size: 5MB.
            </p>

            <form onSubmit={handleUpload} className="upload-form">
                <div className="file-input-container">
                    <label htmlFor="certificate-file" className="file-label">
                        Choose File
                    </label>
                    <input
                        id="certificate-file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                        className="file-input"
                    />
                    {file && (
                        <span className="file-name">{file.name}</span>
                    )}
                </div>

                {uploadError && (
                    <div className="error-message" role="alert">
                        ⚠️ {uploadError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!file || isUploading}
                    className="upload-button"
                >
                    {isUploading ? (
                        <>
                            <span className="spinner"></span>
                            Uploading...
                        </>
                    ) : (
                        'Upload Certificate'
                    )}
                </button>
            </form>

            {jewelryItemId && (
                <p className="item-context">
                    This certificate will be linked to jewelry item: <strong>{jewelryItemId}</strong>
                </p>
            )}
        </div>
    );
}

CertificationUpload.propTypes = {
    onUploadSuccess: PropTypes.func,
    jewelryItemId: PropTypes.string
};