import React from "react";
import Sidebar from "./_component/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-239">
      <Sidebar />
      <div className="flex-1 pl-64 bg-neutral-900">{children}</div>
    </div>
  );
};

export default DashboardLayout;
