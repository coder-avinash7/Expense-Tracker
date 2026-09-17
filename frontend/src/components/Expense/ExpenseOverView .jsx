import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card overflow-hidden">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-indigo-500" />

                        <h5 className="text-lg font-semibold text-white">
                            Expense Overview
                        </h5>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        Track your spending trends over time and gain insights
                        into where your money goes.
                    </p>
                </div>

                <button
                    className="add-btn group"
                    onClick={onExpenseIncome}
                >
                    <LuPlus className="text-lg transition-transform duration-200 group-hover:rotate-90" />
                    Add Expense
                </button>

            </div>

            {/* Chart */}
            <div className="mt-8">
                <CustomLineChart data={chartData} />
            </div>

        </div>
    );
};

export default ExpenseOverview;