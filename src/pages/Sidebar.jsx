import { Button } from "flowbite-react";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

    // Toggle dropdown and change arrow direction
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen); 
    };

    const toggleSettingsDropdown = () => {
        setSettingsDropdownOpen(!isSettingsDropdownOpen); 
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPass');
        toast.success('Logged out successfully!');
        navigate('/');
    };

    const getNavLinkClass = ({ isActive }) =>
        isActive
            ? "flex items-center px-2 py-[6px] text-white bg-gray-700 rounded-md dark:text-white dark:bg-gray-700 group"
            : "flex items-center px-2 py-[6px] text-gray-400 rounded-md dark:text-white hover:bg-gray-800 dark:hover:bg-gray-700 group";

    return (
        <div className="flex font-lexend">
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-1 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm0-10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="https://i.ibb.co.com/zrNvt4h/logo-hs.png" className="h-8 me-3" alt="HS Logo" />
                            </a>
                        </div>
                        {/* User Dropdown */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://i.ibb.co/LnFWKKk/download-8.jpg" alt="User Avatar" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-40">
                                <li>
                                    <p className="font-medium">Ronaldo</p>
                                </li>
                                <li>
                                    <button className="font-medium">Profile</button>
                                </li>
                                <li>
                                    <Button
                                        onClick={handleLogout}
                                        gradientMonochrome="failure"
                                        className="w-full flex items-center justify-center"
                                    >
                                        <TbLogout2 className="w-5 h-5" />
                                        <span className="text-sm ml-2">Logout</span>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-[200px] h-screen pt-[58px] transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-900 dark:bg-gray-800">
                    <ul className="space-y-2 font-normal text-sm">
                        <li className="mt-2">
                            <NavLink to="/dashboard/home" end className={getNavLinkClass}>
                                {/* Dashboard Icon */}
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 text-white font-medium">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/projects" className={getNavLinkClass}>
                                {/* Projects Icon */}
                                <svg className="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286C10 17.169 10.831 18 11.857 18h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="ms-3 text-white">Projects</span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={toggleDropdown} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg dark:text-white dark:bg-gray-700 group dark:hover:bg-gray-700">
                                <FaUsers className="text-xl flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 text-left text-white font-medium text-sm">CRM</span>
                                {/* Arrow Icon */}
                                {isDropdownOpen ? (
                                    <IoIosArrowDown className="w-5 h-4 text-white" />
                                ) : (
                                    <IoIosArrowForward className="w-5 h-4 text-white" />
                                )}
                            </button>
                            {isDropdownOpen && (
                                <ul className="space-y-2 pl-8 mt-2">
                                    <li>
                                        <NavLink to="/dashboard/customers" className={getNavLinkClass}>
                                            <span className="ms-3 text-gray-300">- Customers</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/employees" className={getNavLinkClass}>
                                            <span className="ms-3 text-gray-300">- Employees</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={toggleSettingsDropdown} className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg dark:text-white dark:bg-gray-700 group dark:hover:bg-gray-700">
                                <IoSettings className="text-xl flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 text-left text-white font-medium text-sm">Settings</span>
                                {/* Arrow Icon */}
                                {isSettingsDropdownOpen ? (
                                    <IoIosArrowDown className="w-5 h-4 text-white" />
                                ) : (
                                    <IoIosArrowForward className="w-5 h-4 text-white" />
                                )}
                            </button>
                            {isSettingsDropdownOpen && (
                                <ul className="space-y-2 pl-8 mt-2">
                                    <li>
                                        <NavLink to="/dashboard/department" className={getNavLinkClass}>
                                            <span className="ms-3 text-gray-300">- Department</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/designation" className={getNavLinkClass}>
                                            <span className="ms-3 text-gray-300">- Designation</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </aside>
            <ToastContainer />
            {/* Main Content */}
            <main className="flex-grow ml-48 pl-3 pr-1 mt-16">
                <Outlet />
            </main>
        </div>
    );
}

export default Sidebar;
