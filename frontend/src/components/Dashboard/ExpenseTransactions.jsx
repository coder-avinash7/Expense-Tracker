import React from "react";
import { LuArrowRight, LuReceipt } from "react-icons/lu";
import moment from "moment";
import TrasactionInfoCard from "../Cards/TrasactionInfoCard";

const ExpenseTransactions = ({
    transactions,
    onSeeMore
}) => {

    return (
        <div className="card">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-red-400 to-pink-500" />

                        <h5 className="text-lg font-semibold text-white">
                            Expenses
                        </h5>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                        Your recent spending activity
                    </p>
                </div>

                <button
                    className="card-btn"
                    onClick={onSeeMore}
                >
                    See All
                    <LuArrowRight className="text-base transition-transform duration-200 group-hover:translate-x-1" />
                </button>

            </div>

            {/* Transactions */}
            {transactions && transactions.length > 0 ? (

                <div className="mt-6">

                    {transactions
                        .slice(0, 5)
                        .map((expense) => (

                            <TrasactionInfoCard
                                key={expense._id}
                                title={expense.category}
                                icon={expense.icon}
                                date={moment(expense.date).format("Do MMM YYYY")}
                                amount={expense.amount}
                                type="expense"
                                hideDeleteBtn
                            />

                        ))}

                </div>

            ) : (

                <div className="min-h-[180px] flex flex-col items-center justify-center text-center">

                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 border border-red-400/10">
                        <LuReceipt className="text-xl text-red-400" />
                    </div>

                    <p className="text-sm text-gray-400 mt-3">
                        No recent expenses
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                        Your expenses will appear here.
                    </p>

                </div>

            )}

        </div>
    );
};

export default ExpenseTransactions;