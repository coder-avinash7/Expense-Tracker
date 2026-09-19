import React from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import CustomLengend from "./CustomLengend";

const CustomPieChart = ({
    data = [],
    label,
    totalAmount,
    colors = [],
    showTextAnchor,
    fixedLabel,
}) => {

    // Fallback colors
    const chartColors =
        colors.length > 0
            ? colors
            : [
                  "#8B5CF6",
                  "#06B6D4",
                  "#22C55E",
                  "#F59E0B",
                  "#EC4899",
                  "#6366F1",
              ];

    // Empty data
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-[330px] flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-500/10 border border-emerald-400/10">
                    <span className="text-2xl text-emerald-400">
                        $
                    </span>
                </div>

                <p className="mt-4 text-sm font-medium text-gray-400">
                    No income data available
                </p>

                <p className="mt-1 text-xs text-gray-600">
                    Add income to see your income breakdown
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-[330px] finance-chart-area">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                    {/* 3D EFFECT */}
                    <defs>

                        {/* Purple */}
                        <linearGradient
                            id="piePurpleGradient"
                            x1="0"
                            y1="0"
                            x2="0.8"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#A78BFA"
                            />

                            <stop
                                offset="35%"
                                stopColor="#875CF5"
                            />

                            <stop
                                offset="100%"
                                stopColor="#6438C7"
                            />
                        </linearGradient>

                        {/* Red */}
                        <linearGradient
                            id="pieRedGradient"
                            x1="0"
                            y1="0"
                            x2="0.8"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#FF4B55"
                            />

                            <stop
                                offset="40%"
                                stopColor="#FA2C37"
                            />

                            <stop
                                offset="100%"
                                stopColor="#D71927"
                            />
                        </linearGradient>

                        {/* Orange */}
                        <linearGradient
                            id="pieOrangeGradient"
                            x1="0"
                            y1="0"
                            x2="0.8"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#FF8738"
                            />

                            <stop
                                offset="40%"
                                stopColor="#FF6900"
                            />

                            <stop
                                offset="100%"
                                stopColor="#D94B00"
                            />
                        </linearGradient>

                        {/* 3D shadow */}
                        <filter
                            id="pie3DShadow"
                            x="-30%"
                            y="-30%"
                            width="160%"
                            height="180%"
                        >
                            <feDropShadow
                                dx="0"
                                dy="7"
                                stdDeviation="5"
                                floodColor="#475569"
                                floodOpacity="0.30"
                            />
                        </filter>

                    </defs>

                    {/* MAIN 3D DONUT */}
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="43%"
                        outerRadius={105}
                        innerRadius={72}
                        paddingAngle={3}
                        cornerRadius={5}
                        labelLine={false}
                        stroke="none"
                        filter="url(#pie3DShadow)"
                    >
                        {data.map((entry, index) => {
                            let fill =
                                chartColors[
                                    index % chartColors.length
                                ];

                            if (index === 0) {
                                fill = "url(#piePurpleGradient)";
                            }

                            if (index === 1) {
                                fill = "url(#pieRedGradient)";
                            }

                            if (index === 2) {
                                fill = "url(#pieOrangeGradient)";
                            }

                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={fill}
                                />
                            );
                        })}
                    </Pie>

                    {/* TOOLTIP */}
                    <Tooltip
                        content={(props) => (
                            <CustomTooltip
                                {...props}
                                fixedLabel={fixedLabel}
                            />
                        )}
                    />

                    {/* CENTER TEXT */}
                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="41%"
                                textAnchor="middle"
                                fill="#64748B"
                                fontSize="12"
                                fontWeight="500"
                            >
                                {label}
                            </text>

                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                fill="#4B5563"
                                fontSize="22"
                                fontWeight="700"
                            >
                                {totalAmount}
                            </text>
                        </>
                    )}

                    {/* LEGEND */}
                    <Legend
                        content={CustomLengend}
                        verticalAlign="bottom"
                    />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;