import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Star, X, Plus, CheckCircle2, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const STORE_ITEMS = [
  {
    id: 1,
    name: "JEE Mains 2024 - PYQ Masterclass",
    category: "Books",
    price: 499,
    originalPrice: 999,
    rating: 4.8,
    reviews: 1240,
    image: "/store/pyq_masterclass.png",
    description: "Comprehensive collection of previous year questions with detailed step-by-step solutions and shortcut techniques."
  },
  {
    id: 2,
    name: "Organic Chemistry - Named Reactions PDF",
    category: "Study Material",
    price: 199,
    originalPrice: 399,
    rating: 4.9,
    reviews: 850,
    image: "/store/organic_chem.png",
    description: "All important named reactions for JEE Organic Chemistry in one concise PDF with mechanisms and examples."
  },
  {
    id: 3,
    name: "All India Mock Test Series (20 Tests)",
    category: "Test Series",
    price: 999,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 3200,
    image: "/store/mock_tests.png",
    description: "20 full-length mock tests based on the latest JEE pattern with detailed performance analysis and All India Rank."
  },
  {
    id: 4,
    name: "Physics Formula Cheat Sheet (All Chapters)",
    category: "Study Material",
    price: 99,
    originalPrice: 299,
    rating: 5.0,
    reviews: 5400,
    image: "/store/physics_cheat_sheet.png",
    description: "Quick revision sheets for all Physics chapters, perfect for last-minute revision and formula memorization."
  }
];

export default function Store() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Books', 'Test Series', 'Study Material'];

  const handleBuy = (item) => {
    setCartCount(prev => prev + 1);
    toast.success(`Added ${item.name} to cart!`, {
      style: {
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: '1rem',
      },
      iconTheme: {
        primary: 'var(--brand-orange)',
        secondary: '#fff',
      },
    });
  };

  const filteredItems = activeCategory === 'All' 
    ? STORE_ITEMS 
    : STORE_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      <Toaster position="bottom-right" />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden border-b border-[var(--border-primary)] bg-[var(--bg-primary)]">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[var(--brand-orange)]/[0.05] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20 text-[var(--brand-orange)] text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <ShoppingBag size={12} />
              Orbit Official Store
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Premium Resources for <span className="text-gradient-orange">JEE Success</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed">
              Hand-picked study materials, formula sheets, and masterclasses to give you the competitive edge.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-[var(--brand-orange)]/20 rounded-full blur-2xl group-hover:bg-[var(--brand-orange)]/30 transition-all"></div>
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] flex items-center justify-center shadow-2xl">
              <ShoppingCart size={32} className="text-[var(--brand-orange)]" />
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--brand-orange)] text-white text-xs font-bold flex items-center justify-center shadow-lg border-4 border-[var(--bg-primary)]"
                >
                  {cartCount}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Search */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all
                  ${activeCategory === cat 
                    ? 'bg-[var(--brand-orange)] text-white shadow-lg shadow-orange-500/20' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[var(--brand-orange)]/50'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={16} />
            <input 
              type="text" 
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-[var(--brand-orange)] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-primary)] overflow-hidden hover:border-[var(--brand-orange)]/50 transition-all hover:shadow-2xl hover:shadow-orange-500/5"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--bg-tertiary)]">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-60"></div>
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                   <button 
                    onClick={() => setSelectedItem(item)}
                    className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold shadow-xl hover:scale-105 transition-transform"
                   >
                     Quick View
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold leading-tight group-hover:text-[var(--brand-orange)] transition-colors">{item.name}</h3>
                  <div className="flex items-center gap-1 text-[var(--brand-orange)]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold">{item.rating}</span>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] text-xs font-light mb-6 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-tertiary)] line-through">₹{item.originalPrice}</span>
                    <span className="text-xl font-black">₹{item.price}</span>
                  </div>
                  <button 
                    onClick={() => handleBuy(item)}
                    className="w-12 h-12 rounded-2xl bg-[var(--brand-orange)] text-white flex items-center justify-center hover:bg-[var(--brand-orange-hover)] transition-colors shadow-lg shadow-orange-500/20 active:scale-90"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[var(--bg-tertiary)]">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
                  Verified Resource
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">{selectedItem.name}</h2>
                <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--text-tertiary)] line-through">Original Price: ₹{selectedItem.originalPrice}</span>
                    <span className="text-4xl font-black text-[var(--brand-orange)]">₹{selectedItem.price}</span>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-green-500/10 text-green-500 text-xs font-bold">
                    Save {Math.round((1 - selectedItem.price/selectedItem.originalPrice) * 100)}%
                  </div>
                </div>

                <button 
                  onClick={() => { handleBuy(selectedItem); setSelectedItem(null); }}
                  className="w-full py-5 bg-[var(--brand-orange)] text-white rounded-2xl font-black text-xl hover:bg-[var(--brand-orange-hover)] transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
