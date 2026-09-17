import React, { useEffect, useState } from "react";
import { LuTrendingUp } from "react-icons/lu";
import CustomPieChart from "../Charts/CustomPieChart ";

const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#EC4899",
    "#6366F1",
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const dataArr =
            data?.map((item) => ({
                name: item?.source || "Income",
                amount: Number(item?.amount || 0),
            })) || [];

        setChartData(dataArr);

        return () => {};
    }, [data]);

    return (
        <div className="card overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>

                    <div className="flex items-center gap-2">

                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-500" />

                        <h5 className="text-lg font-semibold text-white">
                            Last 60 Days Income
                        </h5>

                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                        Your income sources from the last 60 days
                    </p>

                </div>

                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-400/10">

                    <LuTrendingUp className="text-emerald-400" />

                </div>

            </div>

            {/* Chart */}
            <div className="mt-2">

                <CustomPieChart
                    data={chartData}
                    label="Total Income"
                    totalAmount={`₹${Number(totalIncome || 0).toLocaleString("en-IN")}`}
                    showTextAnchor
                    colors={COLORS}
                />

            </div>

        </div>
    );
};

export default RecentIncomeWithChart;
