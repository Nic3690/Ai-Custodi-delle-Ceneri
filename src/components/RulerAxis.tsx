const TICKS = 41;

/** Static twin of the scroll ruler: horizontal ticks, left-aligned, no numbers. */
export const RulerAxis = () => (
  <div className="hidden md:block pointer-events-none fixed left-8 top-1/2 -translate-y-1/2 z-20 h-[62vh]">
    <div className="relative h-full flex flex-col justify-between items-start">
      {Array.from({ length: TICKS }).map((_, i) => {
        const major = i % 5 === 0;
        return (
          <span
            key={i}
            className="block"
            style={{
              width: major ? 18 : 9,
              height: 1,
              background: "rgba(242,250,239,0.2)",
            }}
          />
        );
      })}
    </div>
  </div>
);
