import React, { useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function DailyProblem() {
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/problems/daily-problem")
      .then((r) => {
        if (r.data && r.data._id) {
          navigate(`/problems/${r.data._id}`, { replace: true });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch daily problem", err);
      });
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-[var(--bg-primary)] text-[var(--text-secondary)]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--brand-orange)] border-t-transparent rounded-full animate-spin" />
        <p>Loading Daily Challenge...</p>
      </div>
    </div>
  );
}
