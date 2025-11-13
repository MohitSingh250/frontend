import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Shuffle } from "lucide-react";

export default function ShuffleRandomButton() {
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const fetchRandomProblem = async () => {
    try {
      const res = await api.get("/problems/random/problem");
      const problem = res.data;
      if (problem && problem._id) navigate(`/problems/${problem._id}`);
    } catch (err) {
      console.error("Error fetching random problem:", err);
    }
  };

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);

    document.body.classList.add("screen-shake");
    setTimeout(() => document.body.classList.remove("screen-shake"), 350);

    setTimeout(async () => {
      await fetchRandomProblem();
      setAnimating(false);
    }, 550);
  };

  return (
    <button
      onClick={handleClick}
      disabled={animating}
      className={`
        flex items-center justify-center
        h-10 w-10 sm:h-11 sm:w-11
        rounded-xl border 
        bg-[var(--raisin-black)]/70 
        border-[var(--dark-pastel-green)]/30

        transition-all duration-300
        hover:bg-[var(--dark-slate-gray)]/70 
        hover:border-[var(--dark-pastel-green)]
        hover:scale-105 active:scale-95

        ${animating ? "animate-shuffle-pulse opacity-80" : ""}
      `}
    >
      <Shuffle
        size={20}
        className={`
          text-[var(--dark-pastel-green)]
          ${animating ? "animate-shuffle-wiggle" : ""}
        `}
      />
    </button>
  );
}
