import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

const format = (d: Date) =>
  `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} // ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/** Live timestamp readout (HUD telemetry), bottom-right. */
export const Timestamp = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-3 right-5 md:right-8 z-20 font-mono text-[10px] md:text-xs tracking-widest text-foreground/70">
      {format(now)}
    </div>
  );
};
