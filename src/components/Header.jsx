import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../context/AuthContext";


export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <header
      className="
        bg-[var(--dark-slate-gray)]/80 
        border-b border-[var(--dark-pastel-green)]/20 
        shadow-md backdrop-blur-md text-[var(--white)]
        sticky top-0 z-50
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10">
            <img
              src="orbits.png"
              alt="logo"
              className="w-10 h-10 rounded-full border border-[var(--dark-pastel-green)]/40 shadow-sm group-hover:shadow-[0_0_10px_rgba(255,165,0,0.4)] transition"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide text-[#718A9E] group-hover:text-[var(--spanish-orange)] transition">
            Orbit
          </span>
        </Link>

        {/* Right: Navigation */}
        <nav className="flex items-center space-x-6 text-sm font-medium relative">
          <Link
            to="/contests"
            className="hover:text-[var(--dark-pastel-green)] transition"
          >
            Contests
          </Link>
          <Link
            to="/"
            className="hover:text-[var(--dark-pastel-green)] transition"
          >
            Problems
          </Link>

          {user ? (
            <div ref={menuRef} className="relative">
              <img
                src={user.avatar || "https://via.placeholder.com/80"}
                alt={user.username}
                onClick={() => setOpen((prev) => !prev)}
                className="
                  w-8 h-8 rounded-full cursor-pointer 
                  border border-[var(--dark-pastel-green)]/40 
                  hover:border-[var(--dark-pastel-green)] 
                  hover:scale-105 hover:shadow-[0_0_8px_rgba(44,188,93,0.4)] 
                  transition
                "
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
          ) : (
            <>
              <Link
                to="/login"
                className="text-[var(--white)]/80 hover:text-[var(--dark-pastel-green)] transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="
                  bg-[var(--dark-pastel-green)] hover:bg-[var(--aqua)]
                  text-[var(--white)] px-4 py-1.5 rounded-md font-medium
                  transition shadow-sm hover:shadow-[0_0_10px_rgba(27,187,186,0.4)]
                "
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
