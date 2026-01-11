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
            className="relative w-full max-w-md bg-[#1A1A1A] border border-[#282828] rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#8A8A8A] hover:text-white transition-colors rounded-full hover:bg-[#282828]"
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

              <h2 className="text-xl font-bold text-white mb-3">
                Ready to Begin Your Quest?
              </h2>
              
              <p className="text-[#8A8A8A] text-xs font-medium leading-relaxed mb-8 max-w-[90%]">
                Embark on a coding adventure, face challenges, and claim your treasure rewards! 
                Every step counts. Let's level up together!
              </p>

              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#282828] text-[#8A8A8A] font-bold text-xs hover:bg-[#3E3E3E] hover:text-white transition-all"
                >
                  Maybe Later
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2DB55D] text-white font-bold text-xs hover:bg-[#25964D] transition-all shadow-lg shadow-[#2DB55D]/20"
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
