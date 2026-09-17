import React from "react";
import { LuDownload, LuReceipt } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TrasactionInfoCard";
import moment from "moment";

const ExpenseList = ({
    transactions,
    onDelete,
    onDownload
}) => {

    return (
        <div className="card">

            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-red-400 to-pink-500" />

                        <h5 className="text-lg font-semibold text-white">
                            Expense List
                        </h5>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                        Manage and review your recent expenses.
                    </p>
                </div>

                <button
                    className="card-btn"
                    onClick={onDownload}
                >
                    <LuDownload className="text-base" />
                    Download
                </button>

            </div>

            {/* Expense List */}
            {transactions && transactions.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mt-6">

                    {transactions.map((expense) => (

                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category}
                            icon={expense.icon}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            amount={expense.amount}
                            type="expense"
                            onDelete={() => onDelete(expense._id)}
                        />

                    ))}

                </div>

            ) : (

                /* Empty State */
                <div className="min-h-[250px] flex flex-col items-center justify-center text-center">

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-red-500/10 border border-red-400/10">
                        <LuReceipt className="text-2xl text-red-400" />
                    </div>

                    <h6 className="text-sm font-medium text-gray-300 mt-4">
                        No expenses found
                    </h6>

                    <p className="text-xs text-gray-500 mt-1">
                        Add an expense to start tracking your spending.
                    </p>

                </div>

            )}

        </div>
    );
};

export default ExpenseList;