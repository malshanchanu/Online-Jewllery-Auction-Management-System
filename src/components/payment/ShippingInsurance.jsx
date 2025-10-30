import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ShippingInsurance.css";

export default function ShippingInsurance({ onSelect }) {
    const [selected, setSelected] = useState(null);

    const insurancePlans = [
        {
            id: 1,
            name: "Standard Shipping Insurance",
            price: "$5",
            coverage: "Covers shipping delays and minor damages.",
            value: 5
        },
        {
            id: 2,
            name: "Advanced Shipping Insurance",
            price: "$15",
            coverage: "Covers full package loss + major damages.",
            value: 15
        },
        {
            id: 3,
            name: "No Shipping Insurance",
            price: "$0",
            coverage: "No coverage. Customer bears full risk.",
            value: 0
        }
    ];

    const handleSelect = (plan) => {
        setSelected(plan.id);
        if (onSelect) {
            onSelect(plan);
        }
    };

    return (
        <section className="shipping-insurance" aria-labelledby="shipping-insurance-heading">
            <h3 id="shipping-insurance-heading">Shipping Insurance Options</h3>
            <div className="plans" role="group" aria-label="Shipping insurance options">
                {insurancePlans.map((plan) => (
                    <button
                        key={plan.id}
                        className={`plan-card ${selected === plan.id ? "selected" : ""}`}
                        onClick={() => handleSelect(plan)}
                        aria-pressed={selected === plan.id}
                        type="button"
                    >
                        <h4>{plan.name}</h4>
                        <p className="price">{plan.price}</p>
                        <p className="coverage">{plan.coverage}</p>
                    </button>
                ))}
            </div>
            {selected && (
                <p className="selected-msg" aria-live="polite">
                    ✅ You selected: <strong>{insurancePlans.find(p => p.id === selected).name}</strong>
                </p>
            )}
        </section>
    );
}

ShippingInsurance.propTypes = {
    onSelect: PropTypes.func
};