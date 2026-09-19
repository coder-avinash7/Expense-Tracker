import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TrasactionInfoCard from '../Cards/TrasactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {

    return (
        <div className="card">

            <div className="flex items-center justify-between gap-2">

                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1 h-6 shrink-0 rounded-full bg-gradient-to-b from-orange-500 to-amber-400" />

                    <h5 className="text-base sm:text-lg font-semibold text-white whitespace-nowrap">
                        Recent Transactions
                    </h5>
                </div>

                <button
                    className="card-btn shrink-0 flex items-center gap-2"
                    onClick={onSeeMore}
                >
                    <span>See All</span>
                    <LuArrowRight className="text-base" />
                </button>

            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TrasactionInfoCard
                        key={item._id}
                        title={
                            item.type == 'expense'
                                ? item.category
                                : item.source
                        }
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>

        </div>
    );
};

export default RecentTransactions;