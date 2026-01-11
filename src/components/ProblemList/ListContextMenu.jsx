import React, { useEffect, useRef } from "react";
import { GitFork, Edit3, Lock, Globe, Trash2 } from "lucide-react";

export default function ListContextMenu({ isOpen, onClose, position, onAction, list }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'fork', label: 'Fork', icon: <GitFork size={16} />, color: 'text-[var(--text-primary)]' },
    { id: 'edit', label: 'Edit', icon: <Edit3 size={16} />, color: 'text-[var(--text-primary)]', ownerOnly: true },
    { 
      id: 'privacy', 
      label: list?.isPrivate ? 'Make Public' : 'Make Private', 
      icon: list?.isPrivate ? <Globe size={16} /> : <Lock size={16} />, 
      color: 'text-[var(--text-primary)]',
      ownerOnly: true 
    },
    { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, color: 'text-red-500', ownerOnly: true },
  ];

  // Filter actions based on ownership (mocked for now, should check against user ID)
  const filteredActions = actions; // In real app, filter by list.owner === currentUser._id

  return (
    <div 
      ref={menuRef}
      className="fixed z-[100] bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl shadow-2xl py-2 min-w-[180px] animate-in fade-in zoom-in duration-150"
      style={{ top: position.y, left: position.x }}
    >
      {filteredActions.map((action) => (
        <button
          key={action.id}
          onClick={() => {
            onAction(action.id);
            onClose();
          }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-tertiary)] ${action.color}`}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
