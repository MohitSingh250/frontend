import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StudyPlanModal({ isOpen, onClose, onConfirm, planTitle }) {
  const [problemsPerDay, setProblemsPerDay] = useState(1);
  const [selectedDays, setSelectedDays] = useState(['MON', 'TUE', 'WED', 'THU', 'FRI']);

  const days = [
    { id: 'SUN', label: 'SUN' },
    { id: 'MON', label: 'MON' },
    { id: 'TUE', label: 'TUE' },
    { id: 'WED', label: 'WED' },
    { id: 'THU', label: 'THU' },
    { id: 'FRI', label: 'FRI' },
    { id: 'SAT', label: 'SAT' },
  ];

  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleConfirm = () => {
    onConfirm({
      problemsPerDay,
      daysOfWeek: selectedDays
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[var(--bg-secondary)] w-full max-w-lg rounded-2xl border border-[var(--border-primary)] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-primary)] flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-[var(--color-success)]/10 rounded-lg text-[var(--color-success)]">
                  <Calendar size={20} />
               </div>
               <h2 className="text-xl font-bold text-[var(--text-primary)]">New Study Plan</h2>
            </div>
            <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-8">
             {/* 3D Icon Placeholder (simulated with gradient circle) */}
             <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-50 absolute"></div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center shadow-lg border-4 border-[var(--bg-secondary)]">
                   <div className="w-16 h-16 rounded-full border-4 border-white/20"></div>
                </div>
             </div>

             <div className="text-center mb-8">
                <p className="text-[var(--text-secondary)] text-lg">
                   I commit to solve 
                   <input 
                      type="number" 
                      min="1" 
                      max="10" 
                      value={problemsPerDay}
                      onChange={(e) => setProblemsPerDay(parseInt(e.target.value) || 1)}
                      className="w-12 mx-2 bg-[var(--bg-tertiary)] border border-[var(--border-secondary)] rounded text-center text-[var(--text-primary)] font-bold py-1 focus:outline-none focus:border-[var(--color-success)]"
                   />
                   problems on every
                </p>
             </div>

             <div className="flex justify-center gap-2 mb-8">
                {days.map(day => (
                   <button
                      key={day.id}
                      onClick={() => toggleDay(day.id)}
                      className={`
                         w-10 h-12 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all border
                         ${selectedDays.includes(day.id) 
                            ? 'bg-[var(--bg-tertiary)] border-[var(--color-success)] text-[var(--text-primary)] shadow-[0_0_10px_rgba(var(--color-success-rgb),0.3)]' 
                            : 'bg-[var(--bg-primary)] border-[var(--border-secondary)] text-[var(--text-tertiary)] hover:border-[var(--border-primary)]'}
                      `}
                   >
                      <span>{day.label}</span>
                      <span className="text-xs mt-1">{selectedDays.includes(day.id) ? '1' : '/'}</span>
                   </button>
                ))}
             </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-[var(--bg-tertiary)] border-t border-[var(--border-primary)] flex justify-end gap-3">
             <button onClick={onClose} className="px-6 py-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] font-medium transition-colors">
                Cancel
             </button>
             <button onClick={handleConfirm} className="px-6 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold hover:opacity-90 transition-colors">
                Confirm
             </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
