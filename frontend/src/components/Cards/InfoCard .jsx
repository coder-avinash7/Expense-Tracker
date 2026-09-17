import React from "react";

const InfoCard = ({
    icon,
    label,
    color,
    value,
}) => {

    const numericValue = Number(value);

    const safeValue = Number.isFinite(numericValue)
        ? numericValue
        : 0;

    return (
        <div className="info-card">

            <div
                className={`info-card-icon ${
                    color || "bg-purple-500"
                }`}
            >
                {icon}
            </div>

            <div className="info-card-content">

                <p className="info-card-label">
                    {label}
                </p>

                <h3 className="info-card-value">
                    ${safeValue.toLocaleString("en-US")}
                </h3>

            </div>

        </div>
    );
};

export default InfoCard;