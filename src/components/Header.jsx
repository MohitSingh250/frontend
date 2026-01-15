import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import NotificationDropdown from "./NotificationDropdown";
import { AuthContext } from "../context/AuthContext";
import { Bell, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);
  const notifRef = useRef(null);
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
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Problems", path: "/problems", hasDropdown: false },
    { name: "Contest", path: "/contests", hasDropdown: false },
    { name: "Discuss", path: "/discuss", hasDropdown: false },
    { name: "Store", path: "/store", hasDropdown: false },
  ];

  return (
    <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] h-[50px] flex items-center sticky top-0 z-50">
      <div className="w-full px-4 flex items-center justify-between h-full">
        
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-6 h-full">
          <Link to="/" className="flex items-center gap-2">
            <img src="/orbit.png" alt="Orbit" className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight text-[var(--text-primary)]">Orbit</span>
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
              {/* Notifications */}
              <div ref={notifRef} className="relative">
                <button 
                  onClick={() => setNotifOpen(!notifOpen)}
                  className={`p-2 rounded-lg transition ${
                    notifOpen 
                      ? "text-[var(--text-primary)] bg-[var(--bg-tertiary)]" 
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  <Bell size={18} />
                </button>
                {notifOpen && (
                  <NotificationDropdown onClose={() => setNotifOpen(false)} />
                )}
              </div>

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
                    onClose={() => setOpen(false)}
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
                className="text-[var(--brand-orange)] border border-[var(--brand-orange)] hover:bg-[var(--brand-orange)] hover:text-white px-3 py-1.5 rounded-md transition font-medium hidden sm:block"
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
