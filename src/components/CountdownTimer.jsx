import { useEffect, useState } from "react";

export default function CountdownTimer({ target, className = "", compact = false }) {
  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {
    const i = setInterval(() => setTime(target - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);

  if (time <= 0) return <span className="font-bold">00:00:00</span>;

  const d = Math.floor(time / 86400000);
  const h = Math.floor((time % 86400000) / 3600000);
  const m = Math.floor((time % 3600000) / 60000);
  const s = Math.floor((time % 60000) / 1000);

  const pad = (n) => n.toString().padStart(2, "0");

  if (compact) {
     if (d > 0) return <span className={className}>{d}d {pad(h)}h</span>;
     return <span className={className}>{pad(h)}:{pad(m)}:{pad(s)}</span>;
  }

  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`}>
      {d > 0 && <span>{d}d </span>}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
