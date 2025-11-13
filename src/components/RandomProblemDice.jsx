import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RandomProblemButton() {
  const [rolling, setRolling] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const navigate = useNavigate();

  const fetchRandomProblem = async () => {
    try {
      const res = await api.get("/problems/random/problem");
      const problem = res.data;
      if (problem && problem._id) {
        navigate(`/problems/${problem._id}`);
      }
    } catch (err) {
      console.error("Error fetching random problem:", err);
    }
  };

  const handleClick = () => {
    if (rolling) return;

    setRolling(true);

    // Generate random 3D rotation
    const newRot = {
      x: rotation.x + (360 + Math.floor(Math.random() * 360)),
      y: rotation.y + (360 + Math.floor(Math.random() * 360)),
      z: rotation.z + (360 + Math.floor(Math.random() * 360)),
    };

    setRotation(newRot);

    setTimeout(async () => {
      await fetchRandomProblem();
      setRolling(false);
    }, 1100); // match CSS 1s animation
  };

  return (
    <div className="mb-4 flex justify-end">
      <button
        onClick={handleClick}
        disabled={rolling}
        className={`p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur 
          hover:scale-105 active:scale-95 transition
          ${rolling ? "opacity-80 cursor-not-allowed" : ""}
        `}
      >
        <div className="dice-wrapper">
          <div
            className={`dice ${rolling ? "dice-roll-glow" : ""}`}
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
            }}
          >
            <div className="dice-face front">1</div>
            <div className="dice-face back">6</div>
            <div className="dice-face right">3</div>
            <div className="dice-face left">4</div>
            <div className="dice-face top">5</div>
            <div className="dice-face bottom">2</div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default RandomProblemButton;
