import React from "react";

const CustomTooltip = ({ active, payload }) => {

    if (active && payload && payload.length) {
        return (
            <div className="min-w-[160px] rounded-xl px-4 py-3 bg-[#111936] border border-purple-400/20 shadow-2xl">

                <p className="text-xs font-medium text-gray-400 mb-1">
                    {payload[0]?.name || "Expense"}
                </p>

                <p className="text-lg font-semibold text-white">
                    ₹{Number(payload[0]?.value || 0).toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-1.5 mt-2">

                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />

                    <span className="text-[11px] text-red-400">
                        Expense
                    </span>

                </div>

            </div>
        );
    }

    return null;
};

export default CustomTooltip;
