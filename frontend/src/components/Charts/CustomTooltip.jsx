import React from "react";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const name = payload[0]?.name || "";

        // Convert chart name into the short label
        let shortName = name;

        if (name === "Total Balance") {
            shortName = "Balance";
        } else if (name === "Total Expenses") {
            shortName = "Expenses";
        } else if (name === "Total Income") {
            shortName = "Income";
        }

        // Set color according to the selected section
        let dotColor = "bg-gray-400";
        let textColor = "text-gray-400";

        if (name === "Total Balance") {
            dotColor = "bg-purple-400";
            textColor = "text-purple-400";
        } else if (name === "Total Expenses") {
            dotColor = "bg-red-400";
            textColor = "text-red-400";
        } else if (name === "Total Income") {
            dotColor = "bg-orange-400";
            textColor = "text-orange-400";
        }

        return (
            <div className="min-w-[160px] rounded-xl px-4 py-3 bg-[#111936] border border-purple-400/20 shadow-2xl">

                {/* Main Name */}
                <p className="text-xs font-medium text-gray-400 mb-1">
                    {name}
                </p>

                {/* Amount */}
                <p className="text-lg font-semibold text-white">
                    ₹{Number(payload[0]?.value || 0).toLocaleString("en-IN")}
                </p>

                {/* Short Name */}
                <div className="flex items-center gap-1.5 mt-2">
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${dotColor}`}
                    />

                    <span
                        className={`text-[11px] ${textColor}`}
                    >
                        {shortName}
                    </span>
                </div>

            </div>
        );
    }

    return null;
};

export default CustomTooltip;