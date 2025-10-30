import React, { useState } from "react";
import PropTypes from "prop-types";
import "./InsuranceOptions.css";

export default function InsuranceOptions({ jewelryValue, onInsuranceSelect, selectedInsurance }) {
    const [selectedOption, setSelectedOption] = useState(selectedInsurance?.type || "");

    const options = [
        {
            id: 1,
            name: "Basic Insurance",
            price: "$" + (jewelryValue * 0.01).toFixed(2),
            value: jewelryValue * 0.01,
            description: "Covers loss during delivery (1% of item value)."
        },
        {
            id: 2,
            name: "Premium Insurance",
            price: "$" + (jewelryValue * 0.02).toFixed(2),
            value: jewelryValue * 0.02,
            description: "Covers loss + accidental damage (2% of item value)."
        },
        {
            id: 3,
            name: "No Insurance",
            price: "$0",
            value: 0,
            description: "You take full risk of shipping."
        }
    ];

    const handleSelect = (option) => {
        setSelectedOption(option.id);
        if (onInsuranceSelect) {
            onInsuranceSelect({
                selected: option.id !== 3,
                type: option.name,
                amount: option.value
            });
        }
    };

    return (
        <div className="insurance-options">
            <h3>Jewelry Insurance Options</h3>
            <p className="insurance-subtitle">Protect your valuable jewelry during shipping</p>
            <ul>
                {options.map((opt) => (
                    <li
                        key={opt.id}
                        className={selectedOption === opt.id ? "active" : ""}
                        onClick={() => handleSelect(opt)}
                    >
                        <div className="insurance-title">
                            <strong>{opt.name}</strong> - <span className="insurance-price">{opt.price}</span>
                        </div>
                        <p>{opt.description}</p>
                    </li>
                ))}
            </ul>
            {selectedOption && (
                <p className="insurance-selected">
                    ✅ Selected: <strong>{options.find(o => o.id === selectedOption).name}</strong>
                </p>
            )}
        </div>
    );
}

InsuranceOptions.propTypes = {
    jewelryValue: PropTypes.number.isRequired,
    onInsuranceSelect: PropTypes.func.isRequired,
    selectedInsurance: PropTypes.object
};