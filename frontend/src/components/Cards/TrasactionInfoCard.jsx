import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from "react-icons/lu";

const TrasactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete
}) => {

    const isIncome = type === "income";

    return (
        <div
            className="
                group
                relative
                flex
                items-center
                gap-4
                mt-2
                p-3
                rounded-xl
                border border-transparent
                hover:border-white/10
                hover:bg-white/[0.035]
                transition-all
            "
        >

            {/* Icon */}
            <div
                className="
                    w-11 h-11
                    shrink-0
                    flex
                    items-center
                    justify-center
                    text-lg
                    text-gray-200
                    rounded-full
                    bg-white/[0.06]
                    border border-white/10
                "
            >
                {icon ? (
                    <img
                        src={icon}
                        alt={title}
                        className="w-6 h-6 object-contain"
                    />
                ) : (
                    <LuUtensils />
                )}
            </div>

            {/* Information */}
            <div className="flex-1 min-w-0">

                <p
                    className="
                        text-sm
                        text-gray-200
                        font-medium
                        truncate
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-1
                    "
                >
                    {date}
                </p>

            </div>

            {/* Amount */}
            <div className="flex items-center gap-2">

                {!hideDeleteBtn && (
                    <button
                        className="
                            text-gray-600
                            hover:text-red-400
                            opacity-0
                            group-hover:opacity-100
                            transition-all
                            cursor-pointer
                        "
                        onClick={onDelete}
                    >
                        <LuTrash2 size={17} />
                    </button>
                )}

                <div
                    className={`
                        flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-lg
                        text-xs
                        font-medium
                        ${
                            isIncome
                                ? `
                                    bg-emerald-400/10
                                    text-emerald-400
                                    border
                                    border-emerald-400/10
                                `
                                : `
                                    bg-red-400/10
                                    text-red-400
                                    border
                                    border-red-400/10
                                `
                        }
                    `}
                >

                    {/* Amount */}
                    <span>
                        {isIncome ? "+" : "-"} ₹
                        {Number(amount).toLocaleString("en-IN")}
                    </span>

                    {/* Trend Icon */}
                    {isIncome ? (
                        <LuTrendingUp />
                    ) : (
                        <LuTrendingDown />
                    )}

                </div>
            </div>
        </div>
    );
};

export default TrasactionInfoCard;
