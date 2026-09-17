import React, { useEffect, useState } from "react";
import { LuPlus, LuTrendingUp } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChartIncome";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({
    transactions,
    onAddIncome
}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const result =
            prepareIncomeBarChartData(transactions);

        setChartData(result);

        return () => {};

    }, [transactions]);

    return (

        <div className="card">

            {/* Header */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
            ">

                <div>

                    <div className="flex items-center gap-2">

                        <div
                            className="
                                w-9 h-9
                                rounded-xl
                                flex items-center justify-center
                                bg-purple-500/15
                                text-purple-400
                            "
                        >
                            <LuTrendingUp />
                        </div>

                        <div>

                            <h5
                                className="
                                    text-lg
                                    font-semibold
                                    text-white
                                "
                            >
                                Income Overview
                            </h5>

                            <p
                                className="
                                    text-xs
                                    text-gray-500
                                    mt-0.5
                                "
                            >
                                Track your earnings over time and
                                analyze your income trends.
                            </p>

                        </div>

                    </div>

                </div>


                <button
                    className="add-btn"
                    onClick={onAddIncome}
                >
                    <LuPlus className="text-lg" />
                    Add Income
                </button>

            </div>


            {/* Chart */}

            <div className="mt-8">

                <CustomBarChart
                    data={chartData}
                />

            </div>

        </div>
    );
};

export default IncomeOverview;