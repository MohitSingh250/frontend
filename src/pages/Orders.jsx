import React, { useEffect, useState } from "react";
import api from "../api";
import { ShoppingBag, Package, Clock, ExternalLink, Loader2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/users/me/orders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        <Loader2 className="animate-spin mr-2" /> Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Manage your redeemed items and study materials
            </p>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order, idx) => (
              <div 
                key={idx} 
                className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[var(--brand-orange)]/50 transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-primary)] group-hover:scale-105 transition-transform">
                    <Package size={32} className="text-[var(--text-tertiary)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold">{order.itemName}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'completed' ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-medium)]/10 text-[var(--color-medium)]'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-b from-[var(--brand-orange)] to-[var(--brand-orange-hover)] border border-[var(--brand-orange-hover)] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        </div>
                        <span className="font-bold text-[var(--text-secondary)]">{order.price} OrbitCoins</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {order.category === 'Study Material' && (
                    <button className="px-6 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-tertiary)]/80 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                      <ExternalLink size={16} />
                      View Content
                    </button>
                  )}
                  <button className="px-6 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-tertiary)]/80 rounded-xl text-sm font-bold transition-colors">
                    Order Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[var(--bg-secondary)] rounded-3xl border border-dashed border-[var(--border-primary)]">
            <ShoppingCart size={64} className="mx-auto text-[var(--text-tertiary)] mb-6 opacity-20" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">No orders yet</h3>
            <p className="text-[var(--text-secondary)] text-sm mt-2 max-w-xs mx-auto">
              You haven't redeemed any items from the Orbit Store yet.
            </p>
            <Link 
              to="/store" 
              className="inline-block mt-8 px-8 py-3 bg-[var(--brand-orange)] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-transform shadow-xl shadow-[var(--brand-orange)]/20"
            >
              Visit Store
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
