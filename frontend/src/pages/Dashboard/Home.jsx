import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import InfoCard from "../../components/Cards/InfoCard .jsx";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";


const Home = () => {

    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {

        if (loading) {
            return;
        }

        setLoading(true);

        try {

            const response = await axiosInstance.get(
                API_PATHS.DASHBOARD.GET_DATA
            );

            if (response.data) {
                setDashboardData(response.data);
            }

        } catch (error) {

            console.error(
                "Something went wrong while fetching dashboard data:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchDashboardData();

        return () => {};

    }, []);

    /*
     * Convert API values to numbers safely.
     *
     * This prevents undefined/null/string values
     * from causing NaN in calculations.
     */

    const totalBalance = Number(
        dashboardData?.totalBalance ?? 0
    );

    const totalIncome = Number(
        dashboardData?.totalIncome ?? 0
    );

    const totalExpense = Number(
        dashboardData?.totalExpenses ?? 0
    );

    return (
        <DashboardLayout activeMenu="Dashboard">

            <div className="my-5 mx-auto">

                {/* =====================================================
                    TOP SUMMARY CARDS
                ===================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={totalBalance}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={totalIncome}
                        color="bg-green-500"
                    />

                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={totalExpense}
                        color="bg-red-500"
                    />

                </div>


                {/* =====================================================
                    DASHBOARD CONTENT
                ===================================================== */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    {/* Recent Transactions */}

                    <RecentTransactions
                        transactions={
                            dashboardData?.recentTransactions || []
                        }
                        onSeeMore={() => navigate("/expense")}
                    />


                    {/* Financial Overview */}

                    <FinanceOverview
                        totalBalance={totalBalance}
                        totalIncome={totalIncome}
                        totalExpense={totalExpense}
                    />


                    {/* Expense Transactions */}

                    <ExpenseTransactions
                        transactions={
                            dashboardData?.last30DaysExpenses?.transactions || []
                        }
                        onSeeMore={() => navigate("/expense")}
                    />


                    {/* Last 30 Days Expenses Chart */}

                    <Last30DaysExpenses
                        data={
                            dashboardData?.last30DaysExpenses?.transactions || []
                        }
                    />


                    {/* Recent Income */}

                    <RecentIncome
                        transactions={
                            dashboardData?.last60DaysIncome?.transactions || []
                        }
                        onSeeMore={() => navigate("/income")}
                    />


                    {/* Last 60 Days Income Chart */}

                    <RecentIncomeWithChart
                        data={
                            dashboardData?.last60DaysIncome?.transactions?.slice(
                                0,
                                4
                            ) || []
                        }
                        totalIncome={totalIncome}
                    />

                </div>

            </div>

        </DashboardLayout>
    );
};

export default Home;