import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {

    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {

        if (route === "/logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {

        localStorage.clear();

        clearUser();

        navigate("/login");
    };

    return (

        <aside
            className="
                w-[240px]
                min-h-[calc(100vh-72px)]
                sticky top-[72px]
                border-r border-white/10
                bg-[#090e27]/90
                backdrop-blur-xl
                p-4
                z-30
                overflow-y-auto
            "
        >

            {/* Profile */}

            <div
                className="
                    flex flex-col
                    items-center
                    justify-center
                    mt-5
                    mb-8
                "
            >

                <div className="relative">

                    {user?.profileImageUrl ? (

                        <img
                            src={user.profileImageUrl}
                            alt="Profile"
                            className="
                                w-[72px] h-[72px]
                                rounded-full
                                object-cover
                                border-2
                                border-purple-400/40
                                shadow-lg
                                shadow-purple-500/20
                            "
                        />

                    ) : (

                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-[72px]"
                            height="h-[72px]"
                            style="text-xl"
                        />

                    )}

                    <span
                        className="
                            absolute
                            bottom-1
                            right-1
                            w-3 h-3
                            rounded-full
                            bg-emerald-400
                            border-2
                            border-[#090e27]
                        "
                    />

                </div>


                <h5
                    className="
                        text-white
                        font-semibold
                        mt-3
                    "
                >
                    {user?.fullName || "User"}
                </h5>

                <p
                    className="
                        text-[11px]
                        text-gray-500
                        mt-1
                    "
                >
                    Free Plan
                </p>

            </div>


            {/* Menu */}

            <div className="space-y-2">

                {SIDE_MENU_DATA.map((item, index) => {

                    const isActive =
                        activeMenu === item.label;

                    return (

                        <button
                            key={`menu_${index}`}
                            onClick={() => {
                                handleClick(item.path);
                            }}
                            className={`
                                w-full
                                flex items-center gap-4
                                text-sm
                                px-4 py-3
                                rounded-xl
                                transition-all duration-200
                                cursor-pointer

                                ${
                                    isActive
                                        ? `
                                            text-white
                                            bg-gradient-to-r
                                            from-purple-600
                                            to-indigo-600
                                            shadow-lg
                                            shadow-purple-600/20
                                          `
                                        : `
                                            text-gray-400
                                            hover:text-white
                                            hover:bg-white/[0.05]
                                          `
                                }
                            `}
                        >

                            <item.icon className="text-xl shrink-0" />

                            <span>
                                {item.label}
                            </span>

                            {isActive && (
                                <span className="ml-auto text-xs">
                                    →
                                </span>
                            )}

                        </button>

                    );
                })}

            </div>


            {/* Upgrade Card */}

            <div
                className="
                    mt-10
                    p-4
                    rounded-2xl
                    bg-gradient-to-br
                    from-purple-600/25
                    to-indigo-600/10
                    border border-purple-400/20
                "
            >

                <p className="text-sm font-semibold text-white">
                    ✨ Upgrade to Pro
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                    Unlock more insights
                </p>

                <button
                    className="
                        mt-4
                        text-xs
                        text-purple-300
                        hover:text-white
                    "
                >
                    Upgrade →
                </button>

            </div>

        </aside>
    );
};

export default SideMenu;