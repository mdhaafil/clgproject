import { Link } from "react-router-dom";
import { PlusCircle, Edit, BarChart3,User } from "lucide-react";
import Back from "../components/Back.jsx";

export default function AdminDashboard() {
  return (
    <div className="relative min-h-screen">
      <Back />
      <div className="min-h-screen bg-[#0B0B0B] text-white flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1A1A1A] border-r border-red-600 p-6 hidden md:block">
          {" "}
          <br /> <br />
          <h2 className="mb-10 text-2xl font-bold text-red-600">
            SeatServe Admin
          </h2>
          <div className="space-y-6 text-sm">
            <Link
              to="/addproduct"
              className="flex items-center gap-3 hover:text-red-500"
            >
              <PlusCircle size={20} /> Add Food
            </Link>

            <Link
              to="/Update"
              className="flex items-center gap-3 hover:text-red-500"
            >
              <Edit size={20} /> Update Food
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 hover:text-red-500"
            >
              <BarChart3 size={20} /> Orders
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-3 hover:text-red-500"
            >
              <User size={20} /> Register
            </Link>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-10">
          <h1 className="text-4xl font-bold text-[#FFC107] mb-6">
            Admin Dashboard
          </h1>
          <p className="mb-12 text-gray-400">
            Manage food items, prices, and offers from here.
          </p>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Add Food */}
            <Link to="/addproduct">
              <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer border border-red-600">
                <PlusCircle size={40} className="mb-4 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold">Add New Food</h2>
                <p className="text-gray-400">
                  Add popcorn, drinks, combos and more.
                </p>
              </div>
            </Link>

            {/* Update Food */}
            <Link to="/Update">
              <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer border border-red-600">
                <Edit size={40} className="mb-4 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold">Update Food</h2>
                <p className="text-gray-400">
                  Edit prices, names and availability.
                </p>
              </div>
            </Link>
            <Link to="/orders">
              <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer border border-red-600">
                <BarChart3 size={40} className="mb-4 text-red-500" />
                <h2 className="mb-2 text-2xl font-bold">Orders</h2>
                <p className="text-gray-400">View and manage orders.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
