import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors rounded-full hover:bg-[var(--bg-tertiary)]"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-32 h-32 mb-2 relative flex items-center justify-center">
                 <img 
                   src="/store/mountain.jpeg" 
                   className="w-full h-full object-contain drop-shadow-2xl" 
                   alt="Quest Flag" 
                 />
              </div>

              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                Ready to Begin Your Quest?
              </h2>
              
              <p className="text-[var(--text-secondary)] text-xs font-medium leading-relaxed mb-8 max-w-[90%]">
                Embark on a coding adventure, face challenges, and claim your treasure rewards! 
                Every step counts. Let's level up together!
              </p>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-bold text-xs hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all border border-[var(--border-primary)]"
                >
                  Maybe Later
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 px-4 rounded-xl bg-[var(--color-success)] text-[var(--bg-primary)] font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-[var(--color-success)]/20"
                >
                  Yes, Let's Go!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
