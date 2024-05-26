import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gray-300 overflow-hidden">
      <Sidebar />
      <div className="w-full h-full">
        <main className="w-full h-full">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
