import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        console.log("1. DATA RECEIVED BY LAST 30 DAYS:", data);

        const result = prepareExpenseBarChartData(data);

        console.log("2. RESULT FROM prepareExpenseBarChartData:", result);

        setChartData(result);
    }, [data]);

    console.log("3. CHART DATA:", chartData);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-400 to-pink-500" />

        <h5 className="text-lg">
            Last 30 Days Expenses
        </h5>
    </div>
</div>

            <CustomBarChart data={chartData} />
        </div>
    );
};

export default Last30DaysExpenses;