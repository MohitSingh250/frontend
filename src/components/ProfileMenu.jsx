import React, { useContext } from "react";
import { LogOut, Settings, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileMenu({ user, onSignOut }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="absolute right-4 top-14 w-80 bg-[var(--dark-slate-gray)] border border-[var(--orbit-border)] rounded-2xl shadow-2xl p-5 text-[var(--white)] z-50 transition">
      <Link to="/dashboard">
        <div className="flex items-center gap-4 pb-4 border-b border-[var(--orbit-border)]">
          <img
            src={user?.avatar || "https://via.placeholder.com/80"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-[var(--white)]">
              {user?.username || "User"}
            </h3>
            <p className="text-xs text-[var(--orange-peel)]">
              Access all features with our Premium subscription!
            </p>
          </div>
        </div>
      </Link>

      {/* Menu Items */}
      <div className="space-y-2 text-sm border-t border-[var(--orbit-border)] pt-3">
        <MenuItem icon={<Settings />} label="Settings" />
        <MenuItem
          icon={theme === "dark" ? <Sun /> : <Moon />}
          label={`Appearance: ${theme === "dark" ? "Dark" : "Light"}`}
          onClick={toggleTheme}
        />
        <MenuItem
          icon={<LogOut />}
          label="Sign Out"
          onClick={onSignOut}
          danger
        />
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-2 py-2 rounded-lg transition text-left ${
        danger
          ? "text-[var(--alert-red)] hover:bg-[var(--alert-red)]/10"
          : "hover:bg-[var(--dark-slate-gray)]/60 text-[var(--white)]/80"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
