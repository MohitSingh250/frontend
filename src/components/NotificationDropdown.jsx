import React from "react";
import { Trophy, Info, Settings, MoreHorizontal } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "contest",
    message: "Weekly Contest 484 is approaching. Join here!",
    time: "3 days ago",
    icon: <Trophy size={16} className="text-[#ffa116]" />,
  },
  {
    id: 2,
    type: "contest",
    message: "Weekly Contest 483 is approaching. Join here!",
    time: "10 days ago",
    icon: <Trophy size={16} className="text-[#ffa116]" />,
  },
  {
    id: 3,
    type: "contest",
    message: "Weekly Contest 481 is approaching. Join here!",
    time: "24 days ago",
    icon: <Trophy size={16} className="text-[#ffa116]" />,
  },
  {
    id: 4,
    type: "info",
    message: "Your rating has been updated from 1600 to 1644",
    time: "a month ago",
    icon: <Info size={16} className="text-[#3e90ff]" />,
  },
  {
    id: 5,
    type: "contest",
    message: "Weekly Contest 480 is approaching. Join here!",
    time: "a month ago",
    icon: <Trophy size={16} className="text-[#ffa116]" />,
  },
  {
    id: 6,
    type: "contest",
    message: "Weekly Contest 479 is approaching. Join here!",
    time: "a month ago",
    icon: <Trophy size={16} className="text-[#ffa116]" />,
  },
];

export default function NotificationDropdown({ onClose }) {
  return (
    <div className="absolute top-[45px] right-0 w-[320px] bg-[#282828] border border-[#3e3e3e] rounded-xl shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in duration-200">
      {/* List */}
      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
        {notifications.map((notif) => (
          <div 
            key={notif.id}
            className="flex gap-3 p-4 hover:bg-[#333333] transition-colors cursor-pointer border-b border-[#3e3e3e] last:border-0"
          >
            <div className="mt-1 shrink-0">
              {notif.icon}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-[13px] text-[#eff1f6] leading-snug">
                {notif.message.split("Join here!").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-[#3e90ff] hover:underline">Join here!</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
              <span className="text-[11px] text-[#8a8a8a]">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#282828] border-t border-[#3e3e3e]">
        <button className="p-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors text-[#8a8a8a] hover:text-[#eff1f6]">
          <Settings size={16} />
        </button>
        <button className="p-1.5 hover:bg-[#3e3e3e] rounded-md transition-colors text-[#8a8a8a] hover:text-[#eff1f6]">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}
