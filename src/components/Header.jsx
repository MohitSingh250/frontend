import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../context/AuthContext";
import { Bell, MessageSquare } from "lucide-react";

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
    { name: "Explore", path: "/explore" },
    { name: "Problems", path: "/problems" },
    { name: "Contest", path: "/contests" },
    { name: "Discuss", path: "/discuss" },
    { name: "Interview", path: "/interview" },
    { name: "Store", path: "/store" },
  ];

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] h-[50px] flex items-center sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 w-full flex items-center justify-between h-full">
        
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8 h-full">
          <Link to="/" className="flex items-center gap-1">
            <img src="/orbits.png" alt="Orbit" className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight hidden md:block">Orbit</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium h-full flex items-center border-b-2 transition-colors ${
                  location.pathname === link.path
                    ? "border-[var(--brand-orange)] text-[var(--text-primary)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          
          {/* Premium Button */}
          <Link 
            to="/premium"
            className="hidden sm:flex items-center gap-1 px-3 py-1 rounded bg-gradient-to-r from-[#FFA116] to-[#FFC01E] text-white text-xs font-medium hover:opacity-90 transition"
          >
            <span>Premium</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                <Bell className="w-5 h-5" />
              </button>
              
              <div ref={menuRef} className="relative">
                <img
                  src={user.avatar || "https://via.placeholder.com/80"}
                  alt={user.username}
                  onClick={() => setOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full cursor-pointer border border-[var(--border-primary)] hover:border-[var(--text-secondary)] transition"
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
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link to="/login" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded hover:bg-[var(--bg-tertiary)] transition">
                Sign in
              </Link>
              <Link to="/signup" className="text-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/10 px-3 py-1.5 rounded transition">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
