import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, FileCode, MessageSquare, LogOut, Trophy, Plus } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/users", label: "Users", icon: Users },
    { path: "/admin/problems", label: "Problems", icon: FileCode },
    { path: "/admin/contests", label: "Contests", icon: Trophy },
    { path: "/admin/contests/problems/add", label: "Add Contest Problem", icon: Plus },
    { path: "/admin/discussions", label: "Discussions", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#DAE0DE] font-sans flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#282828] border-r border-[#3E3E3E] flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-[#3E3E3E]">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-[#FFA217]">Orbit</span> Admin
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#FFA217] text-white font-bold shadow-lg shadow-[#FFA217]/20"
                    : "text-[#8A8A8A] hover:bg-[#3E3E3E] hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#3E3E3E]">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#8A8A8A] hover:bg-[#3E3E3E] hover:text-white transition-all">
            <LogOut size={20} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
