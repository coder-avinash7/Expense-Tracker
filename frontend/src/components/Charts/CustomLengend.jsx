import React from "react";

const COLORS = [
    "#875CF5", // Total Balance
    "#FA2C37", // Total Expenses
    "#FF6900", // Total Income
];

const CustomLengend = ({ payload = [] }) => {
    return (
        <div className="flex items-center justify-center gap-12 mt-4">
            {payload.slice(0, 3).map((entry, index) => (
                <div
                    key={`legend-${index}`}
                    className="flex items-center gap-2"
                >
                    <span
                        className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                            backgroundColor: COLORS[index],
                        }}
                    />

                    <span className="text-sm font-medium text-gray-500">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLengend;