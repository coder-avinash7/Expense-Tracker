import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {

    // -----------------------------------------
    // BAR COLORS
    // -----------------------------------------

    const getBarColor = (index) => {
        const colors = [
            "#8B5CF6",
            "#6366F1",
            "#A855F7",
            "#06B6D4",
            "#7C3AED",
            "#4F46E5",
        ];

        return colors[index % colors.length];
    };


    // -----------------------------------------
    // CUSTOM TOOLTIP
    // -----------------------------------------

    const CustomTooltip = ({ active, payload }) => {

        if (active && payload && payload.length) {

            const item = payload[0];

            return (
                <div className="min-w-[180px] rounded-xl px-4 py-3 bg-[#111936] border border-purple-400/20 shadow-2xl">

                    <p className="text-xs font-medium text-gray-400 mb-1">
                        {item?.payload?.source ||
                            item?.payload?.month ||
                            "Income"}
                    </p>

                    <p className="text-xl font-semibold text-white">
                        ₹{Number(
                            item?.value || 0
                        ).toLocaleString("en-IN")}
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                        <span className="w-2 h-2 rounded-full bg-emerald-400" />

                        <span className="text-[11px] text-emerald-400">
                            Income
                        </span>

                    </div>

                </div>
            );
        }

        return null;
    };


    // -----------------------------------------
    // EMPTY STATE
    // -----------------------------------------

    if (!data || data.length === 0) {

        return (
            <div className="w-full h-[300px] mt-6 flex flex-col items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.06]">

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-emerald-500/10 border border-emerald-400/10">

                    <span className="text-2xl text-emerald-400">
                        ₹
                    </span>

                </div>

                <p className="mt-4 text-sm font-medium text-gray-400">
                    No income data available
                </p>

                <p className="mt-1 text-xs text-gray-600">
                    Add income to see your income trend
                </p>

            </div>
        );
    }


    // -----------------------------------------
    // CHART
    // -----------------------------------------

    return (
        <div className="w-full h-[300px] mt-6 bg-transparent">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                    barCategoryGap="20%"
                >

                    {/* ---------------------------------
                        GRID
                    ---------------------------------- */}

                    <CartesianGrid
                        vertical={false}
                        stroke="rgba(148,163,184,0.08)"
                        strokeDasharray="4 4"
                    />


                    {/* ---------------------------------
                        X AXIS
                    ---------------------------------- */}

                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 11,
                            fill: "#94A3B8",
                        }}
                        dy={8}
                    />


                    {/* ---------------------------------
                        Y AXIS
                    ---------------------------------- */}

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={50}
                        tick={{
                            fontSize: 11,
                            fill: "#94A3B8",
                        }}
                        tickFormatter={(value) => {

                            if (value >= 1000000) {
                                return `${(
                                    value / 1000000
                                ).toFixed(1)}M`;
                            }

                            if (value >= 1000) {
                                return `${(
                                    value / 1000
                                ).toFixed(0)}K`;
                            }

                            return value;
                        }}
                    />


                    {/* ---------------------------------
                        TOOLTIP
                    ---------------------------------- */}

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            fill: "rgba(139,92,246,0.06)",
                        }}
                    />


                    {/* ---------------------------------
                        BAR
                    ---------------------------------- */}

                    <Bar
                        dataKey="amount"
                        radius={[8, 8, 3, 3]}
                        maxBarSize={48}
                        animationDuration={900}
                        animationEasing="ease-out"
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={`income-cell-${index}`}
                                fill={getBarColor(index)}
                            />
                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
};

export default CustomBarChart;
