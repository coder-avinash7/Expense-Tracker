import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext);

    return (
        <div className="min-h-screen bg-[#070b1f] text-white">

            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block shrink-0">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    {/* Main Content */}
                    <main className="grow min-w-0 px-3 sm:px-5 lg:px-7 py-5">

                        <div className="max-w-[1600px] mx-auto">
                            {children}
                        </div>

                    </main>

                </div>
            )}

        </div>
    );
};

export default DashboardLayout;