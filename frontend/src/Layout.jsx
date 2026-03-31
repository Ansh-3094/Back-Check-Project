import React from "react";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Header/Sidebar";
import { useState } from "react";

function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="app-shell mx-auto flex w-full max-w-400 gap-4 px-2 pb-20 pt-3 sm:px-4 sm:pb-4">
        <div>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
