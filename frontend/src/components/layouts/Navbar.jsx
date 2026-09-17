import React, { useState } from "react";
import {
    HiOutlineMenu,
    HiOutlineX
} from "react-icons/hi";

import {
    LuSearch,
    LuBell,
    LuWallet
} from "react-icons/lu";

import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {

    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <>
            <header
                className="
                    sticky top-0 z-50
                    h-[72px]
                    flex items-center
                    px-4 sm:px-6 lg:px-8
                    border-b
                    border-white/10
                    bg-[#080d25]/85
                    backdrop-blur-xl
                "
            >

                {/* Mobile Menu */}
                <button
                    className="lg:hidden mr-4 text-gray-300"
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                >
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>


                {/* Logo */}
                <div className="flex items-center gap-3 min-w-fit">

                    <div
                        className="
                            w-10 h-10
                            rounded-xl
                            flex items-center justify-center
                            bg-gradient-to-br
                            from-purple-500
                            to-indigo-600
                            shadow-lg
                            shadow-purple-600/25
                        "
                    >
                        <LuWallet
                            className="text-white text-xl"
                        />
                    </div>

                    <div className="hidden sm:block">

                        <h2 className="font-semibold text-white">
                            Expense Tracker
                        </h2>

                        <p className="text-[10px] text-gray-500">
                            Manage Smarter
                        </p>

                    </div>

                </div>


                {/* Search */}
                <div className="hidden md:flex flex-1 justify-center px-6">

                    <div
                        className="
                            w-full max-w-[500px]
                            h-10
                            flex items-center gap-3
                            px-4
                            rounded-xl
                            bg-white/[0.04]
                            border border-white/10
                            text-gray-500
                        "
                    >

                        <LuSearch />

                        <input
                            type="text"
                            placeholder="Search income sources, dates, or categories..."
                            className="
                                flex-1
                                bg-transparent
                                outline-none
                                text-sm
                                text-white
                                placeholder:text-gray-600
                            "
                        />

                        <span
                            className="
                                hidden lg:block
                                text-[10px]
                                border border-white/10
                                px-2 py-1
                                rounded-md
                                text-gray-500
                            "
                        >
                            Ctrl K
                        </span>

                    </div>

                </div>


                {/* Right */}
                <div className="ml-auto flex items-center gap-4">

                    <button
                        className="
                            relative
                            w-9 h-9
                            flex items-center justify-center
                            rounded-full
                            hover:bg-white/5
                        "
                    >
                        <LuBell className="text-gray-300" />

                        <span
                            className="
                                absolute
                                top-1 right-1
                                w-2 h-2
                                bg-pink-500
                                rounded-full
                            "
                        />

                    </button>


                    <div className="hidden sm:flex items-center gap-3">

                        <div
                            className="
                                w-9 h-9
                                rounded-full
                                bg-gradient-to-br
                                from-purple-300
                                to-pink-300
                                flex items-center justify-center
                                text-[#15162d]
                                font-semibold
                            "
                        >
                            A
                        </div>

                        <div className="hidden md:block">

                            <p className="text-sm font-medium text-white">
                                Avi
                            </p>

                            <p className="text-[10px] text-gray-500">
                                Welcome back!
                            </p>

                        </div>

                    </div>

                </div>

            </header>


            {/* Mobile Sidebar */}

            {openSideMenu && (

                <div
                    className="
                        lg:hidden
                        fixed
                        top-[72px]
                        left-0
                        bottom-0
                        z-40
                    "
                >

                    <SideMenu
                        activeMenu={activeMenu}
                    />

                </div>

            )}

        </>
    );
};

export default Navbar;