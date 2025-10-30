import React from "react";
import "./CertificateStyles.css";

export default function AGSCertificate() {
    return (
        <div className="certificate-page">
            <h2>AGS Certificate</h2>
            <p>
                The <strong>AGS Certificate</strong> provides diamond grading reports with a focus
                on cut quality and performance.
            </p>
            <div className="cert-box">
                <h4>Example Details</h4>
                <ul>
                    <li>Certificate ID: AGS-987654</li>
                    <li>Diamond Carat: 2.0 ct</li>
                    <li>Clarity: VVS2</li>
                    <li>Color: E</li>
                    <li>Cut: Ideal</li>
                </ul>
            </div>
        </div>
    );
}
