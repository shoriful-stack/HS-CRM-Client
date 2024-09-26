import { BiSolidFoodMenu } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-52 min-h-screen bg-[#008080] text-white">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/dashboard">
                        <MdDashboard />
                            Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/tender">
                        <BiSolidFoodMenu />
                            Tender</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Dashboard