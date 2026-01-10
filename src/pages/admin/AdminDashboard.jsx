import { useEffect, useState } from "react";
import api from "../../api";
import { Users, FileCode, MessageSquare, Trophy, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, problems: 0, discussions: 0, contests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Users", value: stats.users, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Problems", value: stats.problems, icon: FileCode, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Discussions", value: stats.discussions, icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Contests", value: stats.contests, icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#282828] border border-[#3E3E3E] p-6 rounded-2xl flex items-center gap-4">
            <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-[#8A8A8A] text-sm font-medium">{card.label}</p>
              {loading ? (
                <div className="h-8 w-16 bg-[#3E3E3E] rounded animate-pulse mt-1" />
              ) : (
                <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts or recent activity */}
      <div className="bg-[#282828] border border-[#3E3E3E] rounded-2xl p-8 text-center">
        <TrendingUp className="mx-auto text-[#8A8A8A] mb-4" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">Activity Analytics</h3>
        <p className="text-[#8A8A8A]">Detailed analytics and charts coming soon.</p>
      </div>
    </div>
  );
}
