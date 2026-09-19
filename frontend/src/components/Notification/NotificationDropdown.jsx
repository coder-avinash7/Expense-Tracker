import React, { useEffect, useRef } from "react";
import {
    LuBell,
    LuCheck,
    LuCheckCheck,
    LuTrash2,
    LuX,
    LuTrendingUp,
    LuTrendingDown,
} from "react-icons/lu";

const NotificationDropdown = ({
    notifications = [],
    onMarkAsRead,
    onMarkAllAsRead,
    onClearAll,
    onClose,
}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    return (
        <div
            ref={dropdownRef}
            className="
                absolute
                right-0
                top-12
                z-50
                w-[340px]
                max-w-[calc(100vw-24px)]
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-2xl
            "
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div>
                    <div className="flex items-center gap-2">
                        <LuBell className="text-gray-700" size={18} />

                        <h3 className="text-sm font-semibold text-gray-800">
                            Notifications
                        </h3>

                        {unreadCount > 0 && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                                {unreadCount}
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-[11px] text-gray-400">
                        Your latest account activity
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        transition
                        hover:bg-gray-100
                        hover:text-gray-700
                    "
                >
                    <LuX size={16} />
                </button>
            </div>

            {/* Notifications */}
            <div className="max-h-[360px] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <LuBell className="text-gray-400" size={21} />
                        </div>

                        <p className="text-sm font-medium text-gray-700">
                            No notifications
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            You're all caught up.
                        </p>
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const isIncome = notification.type === "income";
                        const isExpense = notification.type === "expense";

                        return (
                            <div
                                key={notification.id}
                                className={`
                                    group
                                    flex
                                    gap-3
                                    border-b
                                    border-gray-100
                                    px-4
                                    py-3
                                    transition
                                    hover:bg-gray-50
                                    ${
                                        !notification.read
                                            ? "bg-blue-50/40"
                                            : "bg-white"
                                    }
                                `}
                            >
                                {/* Icon */}
                                <div
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${
                                            isIncome
                                                ? "bg-emerald-100 text-emerald-500"
                                                : isExpense
                                                ? "bg-red-100 text-red-500"
                                                : "bg-blue-100 text-blue-500"
                                        }
                                    `}
                                >
                                    {isIncome ? (
                                        <LuTrendingUp size={17} />
                                    ) : isExpense ? (
                                        <LuTrendingDown size={17} />
                                    ) : (
                                        <LuBell size={17} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-xs font-semibold text-gray-700">
                                            {notification.title}
                                        </p>

                                        {!notification.read && (
                                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                        )}
                                    </div>

                                    <p className="mt-1 text-[11px] leading-4 text-gray-500">
                                        {notification.message}
                                    </p>

                                    {notification.time && (
                                        <p className="mt-1 text-[10px] text-gray-400">
                                            {notification.time}
                                        </p>
                                    )}
                                </div>

                                {/* Mark read */}
                                {!notification.read && onMarkAsRead && (
                                    <button
                                        type="button"
                                        title="Mark as read"
                                        onClick={() =>
                                            onMarkAsRead(notification.id)
                                        }
                                        className="
                                            mt-1
                                            flex
                                            h-7
                                            w-7
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-lg
                                            text-gray-400
                                            opacity-100
                                            transition
                                            hover:bg-emerald-50
                                            hover:text-emerald-500
                                        "
                                    >
                                        <LuCheck size={15} />
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <button
                        type="button"
                        onClick={onMarkAllAsRead}
                        disabled={unreadCount === 0}
                        className="
                            flex
                            items-center
                            gap-1.5
                            text-[11px]
                            font-medium
                            text-gray-500
                            transition
                            hover:text-emerald-500
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        <LuCheckCheck size={14} />
                        Mark all as read
                    </button>

                    <button
                        type="button"
                        onClick={onClearAll}
                        className="
                            flex
                            items-center
                            gap-1.5
                            text-[11px]
                            font-medium
                            text-red-400
                            transition
                            hover:text-red-500
                        "
                    >
                        <LuTrash2 size={14} />
                        Clear all
                    </button>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
