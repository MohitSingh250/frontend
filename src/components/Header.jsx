import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null)

  useEffect(()=>{
    if(!open) return 
    const timer = setTimeout(() => {
      setOpen(false)
    }, 3000);
    return ()=>clearTimeout(timer)
  },[open])

  // useEffect(()=>{
  //   const handleClick = ()=>{
  //     setOpen(false)
  //   }

  //   window.addEventListener("click",handleClick)
  //   return ()=>{
  //     window.removeEventListener("click",handleClick)
  //   }
  //   },[])

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
    <header className="bg-[#1a1a1a] border-b border-neutral-800 shadow-lg text-gray-200 relative">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br rounded-md flex items-center justify-center text-black font-bold">
            <img src="orbits.png" alt="logo" className="w-10 h-10 rounded-full" />
          </div>
          <span className="text-lg font-semibold tracking-wide text-white">
            Orbit
          </span>
        </Link>

        {/* Right: Nav */}
        <nav className="flex items-center space-x-6 text-sm font-medium relative">
          <Link to="/contests" className="hover:text-blue-400 transition">
            Contests
          </Link>
          <Link to="/" className="hover:text-blue-400 transition">
            Problems
          </Link>

          {user ? (
            <div ref={menuRef} className="relative">
              <img
                src={user.avatar || "https://via.placeholder.com/80"}
                alt={user.username}
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full cursor-pointer border border-gray-600 hover:scale-105 transition"
              />

              {/* Profile Menu Dropdown */}
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
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition"
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
