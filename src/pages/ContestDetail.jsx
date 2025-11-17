import React from "react";

export default function ContestDetail() {
  return (
    <div className="min-h-screen bg-[#1a1815] text-white pb-32">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-black/60 to-transparent p-6 sticky top-0 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button className="text-xl">⬅</button>
          <h1 className="text-3xl font-bold text-orange-400">JEE Advanced Physics – Mock Test 12</h1>
          <div className="flex gap-4">
            <button className="bg-orange-500 px-5 py-2 rounded-full font-semibold">
              Register
            </button>
            <button className="bg-[#2b2926] px-4 py-2 rounded-full text-lg">⏱</button>
            <button className="bg-[#2b2926] px-4 py-2 rounded-full text-lg">🔗</button>
          </div>
        </div>
      </div>

      {/* Contest Info */}
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <p className="text-gray-300 text-lg">
          Sun, Nov 16, 08:00 AM IST • Starts in 20:54:07
        </p>

        <h2 className="text-2xl font-bold mt-10">Welcome to the JEE Advanced Physics Mock Examination</h2>
        <p className="text-gray-300 mt-3 leading-7">
          This physics mock test is designed for students aiming for top performance
          in JEE Advanced. The paper consists of a curated collection of conceptual,
          analytical, and multi-step physics problems.
        </p>

        {/* Rewards */}
        <h3 className="text-2xl font-semibold mt-8">⭐ Performance Rewards</h3>
        <ul className="mt-3 space-y-2">
          <li className="flex gap-2"><span className="text-blue-400">•</span> Top 1 – 3 performers will receive a detailed Physics mastery report.</li>
          <li className="flex gap-2"><span className="text-blue-400">•</span> Rank 4 – 10 will receive advanced problem-solving worksheets.</li>
          <li className="flex gap-2"><span className="text-blue-400">•</span> Rank milestones like 50th, 100th, 200th will receive specialized topic-wise microtests.</li>
        </ul>

        {/* Important Notes */}
        <h3 className="text-2xl font-semibold mt-12">📌 Important Notes</h3>
        <ol className="mt-4 space-y-3 text-gray-300 list-decimal list-inside leading-7">
          <li>The test follows the JEE Advanced pattern—multiple section types included.</li>
          <li>Negative marking is applicable for certain sections.</li>
          <li>No calculators or external aids allowed.</li>
          <li>Results will be updated within 48 hours of test completion.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-10">The following are considered violations:</h3>
        <ul className="mt-4 space-y-3 text-gray-300 leading-7">
          <li>• Using external help or exchanging answers during the test.</li>
          <li>• Switching browser tabs frequently (auto-flagged).</li>
          <li>• Multiple logins from different devices.</li>
          <li>• Sharing questions publicly before the exam ends.</li>
        </ul>

        {/* Announcements */}
        <h3 className="text-2xl font-semibold mt-16">📢 Announcements</h3>
        <p className="text-gray-300 mt-2">Students <strong>must register</strong> to participate in the mock test.</p>

        {/* Prize Table */}
        <h3 className="text-2xl font-semibold mt-10">🏆 Scoring Breakdown</h3>
        <table className="w-full mt-4 border border-gray-700 text-left">
          <tbody>
            {[
              { label: "Full Marks", value: "198" },
              { label: "Easy Questions", value: "+3 each" },
              { label: "Moderate Questions", value: "+4 each" },
              { label: "Difficult Questions", value: "+6 each" },
              { label: "Negative Marking", value: "Varies by section" },
            ].map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-700 hover:bg-white/5 transition"
              >
                <td className="p-3 font-semibold">{row.label}</td>
                <td className="p-3">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
          © 2025 JEE Physics Mock Platform • Terms • Privacy • Help Center
        </div>
      </div>
    </div>
  );
}
