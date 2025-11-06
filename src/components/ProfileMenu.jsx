import React from "react";
import {LogOut,Settings,Moon} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileMenu({ user, onSignOut }) {
  return (
    <div className="absolute right-4 top-14 w-80 bg-[#1a1a1a] border border-[#2f2f2f] rounded-2xl shadow-2xl p-5 text-gray-200 z-50">
        <Link to="/dashboard">
      <div className="flex items-center gap-4 pb-4 border-b border-[#2f2f2f]">
        
        <img
          src={user?.avatar || "https://via.placeholder.com/80"}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">
            {user?.username || "User"}
          </h3>
          <p className="text-xs text-amber-400">
            Access all features with our Premium subscription!
          </p>
        </div>
      </div>
      </Link>

      {/* Other Options */}
      <div className="space-y-2 text-sm border-t border-[#2f2f2f] pt-3">
        <MenuItem icon={<Settings />} label="Settings" />
        <MenuItem icon={<Moon />} label="Appearance" />
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
          ? "text-red-400 hover:bg-red-900/20"
          : "hover:bg-[#2a2a2a] text-gray-300"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}