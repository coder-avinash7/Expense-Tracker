import React from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

const CustomLineChart = ({ data = [] }) => {

    const CustomTooltip = ({ active, payload }) => {

        if (active && payload && payload.length) {

            const item = payload[0];
            const transaction = item.payload;

            return (
                <div className="min-w-[170px] rounded-xl px-4 py-3 bg-[#111936] border border-purple-400/20 shadow-2xl">

                    <p className="text-xs font-medium text-gray-400 mb-1">
                        {transaction?.category ||
                            transaction?.month ||
                            "Expense"}
                    </p>

                    <p className="text-lg font-semibold text-white">
                        ${Number(transaction?.amount || 0).toLocaleString()}
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

    /* Empty State */
    if (!data || data.length === 0) {

        return (
            <div className="w-full h-[300px] mt-6 flex flex-col items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.06]">

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-500/10 border border-purple-400/10">

                    <span className="text-2xl text-purple-400">
                        ₹
                    </span>

                </div>

                <p className="mt-4 text-sm font-medium text-gray-400">
                    No expense data available
                </p>

                <p className="mt-1 text-xs text-gray-600">
                    Add expenses to see your spending trend
                </p>

            </div>
        );
    }

    return (

        /*
         * IMPORTANT:
         * No bg-white here.
         * The chart is completely transparent.
         */
        <div className="w-full h-[300px] mt-6 bg-transparent">

            <ResponsiveContainer
                width="100%"
                height="100%"
            >

                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                >

                    {/* Gradient */}
                    <defs>

                        <linearGradient
                            id="expenseGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#8B5CF6"
                                stopOpacity={0.35}
                            />

                            <stop
                                offset="50%"
                                stopColor="#6366F1"
                                stopOpacity={0.12}
                            />

                            <stop
                                offset="100%"
                                stopColor="#6366F1"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    {/* Grid */}
                    <CartesianGrid
                        vertical={false}
                        stroke="rgba(148,163,184,0.08)"
                        strokeDasharray="4 4"
                    />

                    {/* X Axis */}
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

                    {/* Y Axis */}
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

                    {/* Tooltip */}
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{
                            stroke: "#8B5CF6",
                            strokeWidth: 1,
                            strokeDasharray: "4 4",
                        }}
                    />

                    {/* Expense Area */}
                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#8B5CF6"
                        fill="url(#expenseGradient)"
                        strokeWidth={3}
                        dot={{
                            r: 3,
                            fill: "#A78BFA",
                            stroke: "#8B5CF6",
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 6,
                            fill: "#C4B5FD",
                            stroke: "#8B5CF6",
                            strokeWidth: 2,
                        }}
                        animationDuration={900}
                        animationEasing="ease-out"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    );
};

export default CustomLineChart;