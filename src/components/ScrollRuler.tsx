interface ScrollRulerProps {
  percent: number;
  /** Force the horizontal (bottom) layout on every breakpoint. */
  horizontal?: boolean;
}

const TICKS = 41;

/** Scroll indicator: vertical ruler on the right (desktop), horizontal at the
 *  bottom above the coordinates (mobile). `horizontal` forces the bottom bar
 *  everywhere (used by the horizontally-scrolling gallery). */
export const ScrollRuler = ({ percent, horizontal = false }: ScrollRulerProps) => {
  const remaining = 100 - percent;
  const ticks = Array.from({ length: TICKS });

  return (
    <>
      {/* Desktop: vertical ruler on the right (skipped when forced horizontal) */}
      <div
        className={`${
          horizontal ? "hidden" : "hidden md:block"
        } pointer-events-none fixed right-8 top-1/2 -translate-y-1/2 z-20 h-[62vh]`}
      >
        <div className="relative h-full flex flex-col justify-between items-end">
          {ticks.map((_, i) => {
            const tickPct = (i / (TICKS - 1)) * 100;
            const active = tickPct <= percent;
            const major = i % 5 === 0;
            return (
              <span
                key={i}
                className="block transition-colors"
                style={{
                  width: major ? 18 : 9,
                  height: 1,
                  background: active ? "#fe4a00" : "rgba(242,250,239,0.2)",
                }}
              />
            );
          })}

          <span
            className="absolute right-0"
            style={{
              top: `${percent}%`,
              width: 26,
              height: 2,
              background: "#fe4a00",
              transform: "translateY(-50%)",
            }}
          />

          <span
            className="absolute right-9 top-0 -translate-y-1/2 font-mono text-xs whitespace-nowrap"
            style={{ color: "#fe4a00" }}
          >
            {percent}%
          </span>
          <span className="absolute right-9 bottom-0 translate-y-1/2 font-mono text-xs whitespace-nowrap text-foreground/50">
            -{remaining}%
          </span>
        </div>
      </div>

      {/* Horizontal ruler along the bottom (mobile, or forced via prop) */}
      <div
        className={`${
          horizontal ? "" : "md:hidden"
        } pointer-events-none fixed bottom-9 inset-x-6 z-20`}
      >
        <div className="relative w-full flex flex-row justify-between items-end h-4">
          {ticks.map((_, i) => {
            const tickPct = (i / (TICKS - 1)) * 100;
            const active = tickPct <= percent;
            const major = i % 5 === 0;
            return (
              <span
                key={i}
                className="block transition-colors"
                style={{
                  width: 1,
                  height: major ? 14 : 7,
                  background: active ? "#fe4a00" : "rgba(242,250,239,0.2)",
                }}
              />
            );
          })}

          {/* moving indicator */}
          <span
            className="absolute bottom-0"
            style={{
              left: `${percent}%`,
              width: 2,
              height: 16,
              background: "#fe4a00",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
    </>
  );
};
