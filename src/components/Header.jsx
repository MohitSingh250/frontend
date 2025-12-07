import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../context/AuthContext";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 10000);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Explore", path: "/explore", hasDropdown: false },
    { name: "Problems", path: "/problems", hasDropdown: false },
    { name: "Contest", path: "/contests", hasDropdown: false },
    { name: "Discuss", path: "/discuss", hasDropdown: false },
    { name: "Interview", path: "/interview", hasDropdown: true },
    { name: "Store", path: "/store", hasDropdown: true },
  ];

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] h-[50px] flex items-center sticky top-0 z-50">
      <div className="w-full px-4 flex items-center justify-between h-full">
        
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-6 h-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="/orbits.png" alt="Orbit" className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight text-[var(--text-primary)] hidden sm:block">Orbit</span>
          </Link>

          <nav className="hidden md:flex items-center h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium h-full flex items-center px-3 border-b-[3px] transition-colors ${
                  location.pathname === link.path || location.pathname.startsWith(link.path + "/")
                    ? "border-[var(--brand-orange)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown size={14} className="ml-1 opacity-60" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          
          {user ? (
            <>
              {/* Streak / Fire Icon */}
              <div className="hidden sm:flex items-center gap-1 text-[var(--text-secondary)]">
                <span className="text-orange-500">🔥</span>
                <span className="text-sm font-medium">0</span>
              </div>

              {/* Notifications */}
              <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition">
                <Bell size={18} />
              </button>

              {/* Premium Button */}
              <Link 
                to="/premium"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-[#FFA116] to-[#FFB340] text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
              >
                Premium
              </Link>
              
              {/* Profile Avatar */}
              <div ref={menuRef} className="relative">
                <img
                  src={user.avatar || "https://via.placeholder.com/80"}
                  alt={user.username}
                  onClick={() => setOpen((prev) => !prev)}
                  className="w-7 h-7 rounded-full cursor-pointer border-2 border-transparent hover:border-[var(--brand-orange)] transition"
                />
                {open && (
                  <ProfileMenu
                    user={user}
                    onSignOut={() => {
                      logout();
                      setOpen(false);
                    }}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              {/* Premium Button */}
              <Link 
                to="/premium"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-[#FFA116] to-[#FFB340] text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
              >
                Premium
              </Link>
              <Link 
                to="/login" 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-md hover:bg-[var(--bg-tertiary)] transition font-medium"
              >
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="text-[var(--brand-orange)] border border-[var(--brand-orange)] hover:bg-[var(--brand-orange)] hover:text-white px-3 py-1.5 rounded-md transition font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
