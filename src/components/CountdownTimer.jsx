import { useEffect, useState } from "react";

export default function CountdownTimer({ target }) {
  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {
    const i = setInterval(() => setTime(target - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);

  if (time <= 0)
    return <span className="text-green-400 font-bold animate-pulse">Live Now</span>;

  const d = Math.floor(time / 86400000);
  const h = Math.floor((time % 86400000) / 3600000);
  const m = Math.floor((time % 3600000) / 60000);
  const s = Math.floor((time % 60000) / 1000);

  return (
    <span className="font-mono text-xl text-yellow-400 tracking-wide">
      {d}d : {h}h : {m}m : {s}s
    </span>
  );
}
