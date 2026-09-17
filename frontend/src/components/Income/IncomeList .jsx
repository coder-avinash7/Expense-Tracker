import React from "react";
import { LuDownload, LuDatabase } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TrasactionInfoCard";
import moment from "moment";

const IncomeList = ({
    transactions,
    onDelete,
    onDownload
}) => {

    return (

        <div className="card mt-6">

            {/* Header */}

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mb-5
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-9 h-9
                            rounded-xl
                            flex items-center justify-center
                            bg-cyan-500/10
                            text-cyan-400
                        "
                    >
                        <LuDatabase />
                    </div>

                    <div>

                        <h5
                            className="
                                text-lg
                                font-semibold
                                text-white
                            "
                        >
                            Income Sources
                        </h5>

                        <p
                            className="
                                text-xs
                                text-gray-500
                            "
                        >
                            All your income sources and earnings
                        </p>

                    </div>

                </div>


                <button
                    className="card-btn"
                    onClick={onDownload}
                >
                    <LuDownload className="text-base" />
                    Download
                </button>

            </div>


            {/* Transactions */}

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-x-8
                "
            >

                {transactions?.map((income) => (

                    <TransactionInfoCard
                        key={income._id}
                        title={income.source}
                        icon={income.icon}
                        date={
                            moment(income.date)
                                .format("Do MMM YYYY")
                        }
                        amount={income.amount}
                        type="income"
                        onDelete={() => {
                            onDelete(income._id);
                        }}
                    />

                ))}

            </div>

        </div>
    );
};

export default IncomeList;