import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ProblemListSidebar from "../components/ProblemList/ProblemListSidebar";
import { SidebarContext } from "../context/SidebarContext";

export default function SidebarLayout() {
  const { isOpen, close } = useContext(SidebarContext);

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)] relative">
      <ProblemListSidebar isOpen={isOpen} onClose={close} />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
