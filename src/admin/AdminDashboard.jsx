import { useState } from "react";
import CreateContest from "./CreateContest";
import CreateContestProblem from "./CreateContestProblem";
import CreatePracticeProblem from "./CreatePracticeProblem";

export default function AdminDashboard() {
  const [view, setView] = useState("contest");

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6" >Admin Panel</h2>

        <button
          onClick={() => setView("contest")}
          className={`w-full text-left p-3 rounded transition ${
            view === "contest"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          ➕ Create Contest
        </button>

        <button
          onClick={() => setView("contestProblem")}
          className={`w-full text-left p-3 rounded transition ${
            view === "contestProblem"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          📝 Add Contest Problem
        </button>

        <button
          onClick={() => setView("practiceProblem")}
          className={`w-full text-left p-3 rounded transition ${
            view === "practiceProblem"
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          📘 Add Practice Problem
        </button>
      </div>

      <div className="flex-1 p-10 overflow-auto">
        {view === "contest" && <CreateContest />}
        {view === "contestProblem" && <CreateContestProblem />}
        {view === "practiceProblem" && <CreatePracticeProblem />}
      </div>
    </div>
  );
}
