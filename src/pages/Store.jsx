import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Star, X, Plus, CheckCircle2, Eye, Search, Trophy, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const STORE_ITEMS = [
  {
    id: 2,
    name: "Physics Formula Cheat Sheet",
    category: "Study Material",
    price: 99,
    image: "/store/physics_cheat_sheet_v2.png",
    description: "Quick revision sheets for all Physics chapters, perfect for JEE Mains and Advanced revision."
  },
  {
    id: 3,
    name: "JEE Mains Mock Test Series",
    category: "Test Series",
    price: 999,
    image: "/store/mock_tests_v2.png",
    description: "20 full-length mock tests based on the latest JEE pattern with detailed performance analysis."
  },
  {
    id: 4,
    name: "Organic Chemistry Named Reactions",
    category: "Study Material",
    price: 199,
    image: "/store/organic_v2.png",
    description: "All important named reactions for JEE Organic Chemistry in one concise PDF with mechanisms."
  },
  {
    id: 5,
    name: "Orbit T-Shirt",
    category: "Swag",
    price: 7200,
    image: "/store/orbit_tshirt.png",
    description: "Redeem Your Free T-Shirts. High quality Orbit branded apparel."
  },
  {
    id: 6,
    name: "Orbit Cap",
    category: "Swag",
    price: 6500,
    image: "/store/orbit_cap.png",
    description: "Orbit Branded Cap. Comes in black or white."
  },
  {
    id: 7,
    name: "Orbit Kit",
    category: "Swag",
    price: 9400,
    image: "/store/orbit_kit.png",
    description: "Exclusive Orbit Kit. Includes t-shirt, keychain and coaster."
  },
  {
    id: 8,
    name: "Orbit Laptop Sleeve",
    category: "Swag",
    price: 9600,
    image: "/store/orbit_laptop_sleeve.png",
    description: "Orbit's exclusive laptop sleeve. Protect your gear in style."
  },
  {
    id: 9,
    name: "Time Travel Ticket",
    category: "Utility",
    price: 70,
    image: "/store/treasure.png",
    description: "Travel Back in Time to Finish 1 Missing Challenge. For Daily JEE Coding Challenge."
  },
  {
    id: 10,
    name: "Orbit Premium Subscription",
    category: "Premium",
    price: 6000,
    image: "/store/sprint_v2.png",
    description: "Redeem Premium with OrbitCoins. Get access to premium JEE content and mock tests."
  }
];

const MISSION_CATEGORIES = [
  {
    title: "Check-in Missions",
    missions: [
      { id: 1, title: "Daily Check-in", reward: 1, icon: "coin", link: "/problems" },
      { id: 2, title: "30-day Streak Check-in", reward: 30, icon: "coin", link: "/problems" },
      { id: 3, title: "Complete Daily JEE Problem", reward: 10, icon: "coin", link: "/daily" },
      { id: 4, title: "Completing Weekly Premium Challenges", reward: 35, icon: "coin", link: "/problems" }
    ]
  },
  {
    title: "Contribution Missions",
    missions: [
      { id: 5, title: "Contribute a JEE Question", reward: 1000, icon: "coin", link: "/discuss" },
      { id: 6, title: "Contribute a Solution", reward: 100, icon: "coin", link: "/discuss" },
      { id: 7, title: "File Content Issue to Feedback Repo", reward: 100, icon: "coin", link: "/discuss" },
      { id: 8, title: "Report a Contest Violation", reward: 100, icon: "coin", link: "/contests" }
    ]
  },
  {
    title: "Contest Missions",
    missions: [
      { id: 9, title: "Join a Mock Contest", reward: 5, icon: "coin", link: "/contests" },
      { id: 10, title: "Join Biweekly + Weekly Contests in Same Week", reward: 35, icon: "coin", link: "/contests" },
      { id: 11, title: "1st Place in a Contest", reward: 5000, icon: "coin", link: "/contests" },
      { id: 12, title: "2nd Place in a Contest", reward: 2500, icon: "coin", link: "/contests" },
      { id: 13, title: "3rd Place in a Contest", reward: 1000, icon: "coin", link: "/contests" },
      { id: 14, title: "Top 50 in a Contest", reward: 300, icon: "coin", link: "/contests" }
    ]
  }
];

export default function Store() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('redeem'); // 'redeem' | 'earn'
  const navigate = useNavigate();

  const categories = ['All', 'Books', 'Test Series', 'Study Material', 'Swag', 'Utility'];

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
      <div className="relative pt-24 pb-20 px-6 overflow-hidden bg-[var(--bg-primary)] border-b border-[var(--border-primary)]/50">
        <style>{`
          :root[data-theme="dark"] .store-hero-gradient {
            background: linear-gradient(to bottom, #282828, var(--bg-primary));
          }
        `}</style>
        <div className="absolute inset-0 store-hero-gradient opacity-100 dark:opacity-100"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
               <div className="absolute inset-0 bg-[var(--brand-orange)]/10 blur-3xl rounded-full dark:bg-[var(--brand-orange)]/20"></div>
               <img 
                 src="/orbit.png" 
                 alt="Orbit Logo" 
                 className="relative w-full h-full object-contain brightness-110 dark:brightness-110"
               />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
          >
            Orbit <span className="font-light text-[var(--text-secondary)]">Store</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-tertiary)] text-sm md:text-base mb-12 max-w-xl mx-auto"
          >
            Shop in our store or redeem our products for free by using OrbitCoins.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button 
              onClick={() => setActiveTab('redeem')}
              className={`px-10 py-3.5 rounded-full font-bold text-base transition-all flex items-center gap-3 shadow-lg ${
                activeTab === 'redeem' 
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] scale-105' 
                  : 'bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Trophy size={20} className={activeTab === 'redeem' ? "text-[var(--brand-orange)] fill-[var(--brand-orange)]" : "text-[var(--text-tertiary)]"} />
              Redeem
            </button>
            <button 
              onClick={() => setActiveTab('earn')}
              className={`px-10 py-3.5 rounded-full font-bold text-base transition-all flex items-center gap-3 shadow-lg ${
                activeTab === 'earn' 
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] scale-105' 
                  : 'bg-[var(--bg-secondary)] border border-dashed border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              <Plus size={20} className={activeTab === 'earn' ? "text-[var(--brand-orange)]" : "text-[var(--text-tertiary)]"} />
              Earn <span className="text-[var(--brand-orange)]">OrbitCoin</span>
            </button>
            <button 
              onClick={() => navigate('/premium')}
              className="px-10 py-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] font-bold text-base hover:bg-[var(--bg-tertiary)] transition-all flex items-center gap-3 shadow-lg"
            >
              <Star size={20} className="text-[var(--text-tertiary)]" />
              Premium
            </button>
          </motion.div>
        </div>
      </div>

      {activeTab === 'redeem' ? (
        <>
          {/* Categories */}
          <div className="max-w-6xl mx-auto px-6 mt-12">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all
                    ${activeCategory === cat 
                      ? 'bg-[#F7D49E] text-white shadow-lg' 
                      : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-primary)] hover:border-[#F7D49E]/50'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Items Grid */}
          <div className="max-w-6xl mx-auto px-6 mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-[var(--bg-secondary)] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-[var(--border-primary)] flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-primary)] p-4 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                       <button 
                        onClick={() => setSelectedItem(item)}
                        className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold shadow-xl hover:scale-105 transition-transform"
                       >
                         Quick View
                       </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-base font-medium text-[var(--text-primary)] mb-1">{item.name}</h3>
                      <p className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-wider mb-4">
                        {item.category}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-[var(--text-tertiary)] text-[10px] max-w-[150px] leading-tight">
                        {item.description.split('.')[0]}.
                      </p>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7D49E] rounded-lg shadow-sm">
                        <span className="text-sm font-bold text-white drop-shadow-sm">
                          {item.price.toLocaleString()}
                        </span>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-600 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-yellow-200/50"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Redeem With Code Section */}
          <div className="max-w-4xl mx-auto px-6 mt-32 mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-orange)]/10 border border-[var(--brand-orange)]/20 text-[var(--brand-orange)] text-[10px] font-bold uppercase tracking-widest mb-6">
              Exclusive Access
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 tracking-tight">Redeem With Code</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0 max-w-lg mx-auto group">
              <input 
                type="text" 
                placeholder="Enter Redeem Code"
                className="w-full sm:w-80 px-8 py-4 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-sm focus:outline-none focus:border-[#F7D49E] focus:ring-4 focus:ring-[#F7D49E]/10 transition-all text-[var(--text-primary)] placeholder-[var(--text-tertiary)]"
              />
              <button className="w-full sm:w-auto px-12 py-4 bg-[#F7D49E] text-white font-black text-sm rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none hover:bg-[#f5c985] transition-all shadow-xl shadow-orange-500/10 active:scale-95">
                Redeem
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Missions Content */
        <div className="max-w-6xl mx-auto px-6 mt-16 space-y-20 mb-20">
          {MISSION_CATEGORIES.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-xl font-medium text-center text-[var(--text-secondary)] mb-12">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.missions.map((mission) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-[var(--border-primary)] shadow-sm hover:shadow-md transition-all flex items-center gap-6 group"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-600 flex items-center justify-center shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-yellow-200/50"></div>
                      </div>
                      <span className="text-[#F7D49E] font-bold text-sm">+{mission.reward}</span>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="text-[var(--text-primary)] font-medium text-sm mb-3">
                        {mission.title}
                      </h3>
                      <button 
                        onClick={() => navigate(mission.link)}
                        className="flex items-center gap-1 text-[var(--brand-orange)] text-[10px] font-bold uppercase tracking-wider border border-dashed border-[var(--brand-orange)]/50 px-4 py-1.5 rounded-lg group-hover:bg-[var(--brand-orange)]/5 transition-all"
                      >
                        Go to mission <ChevronRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              {idx < MISSION_CATEGORIES.length - 1 && (
                <div className="mt-20 border-t border-dashed border-[var(--border-primary)]/30"></div>
              )}
            </div>
          ))}
        </div>
      )}

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
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/20 text-[var(--text-primary)] flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[var(--bg-tertiary)]">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7D49E]/10 text-[#F7D49E] text-[10px] font-bold uppercase tracking-widest mb-6 w-fit">
                  {selectedItem.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-[var(--text-primary)]">{selectedItem.name}</h2>
                <p className="text-[var(--text-secondary)] text-sm md:text-base font-light leading-relaxed mb-8">
                  {selectedItem.description}
                </p>
                
                <div className="flex items-center gap-6 mb-10">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#F7D49E] rounded-2xl shadow-lg">
                    <span className="text-3xl font-black text-white drop-shadow-md">
                      {selectedItem.price.toLocaleString()}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 border border-yellow-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-200/50"></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => { handleBuy(selectedItem); setSelectedItem(null); }}
                  className="w-full py-5 bg-[#F7D49E] text-white rounded-2xl font-black text-xl hover:bg-[#f5c985] transition-all shadow-xl shadow-orange-500/10 active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Redeem Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
