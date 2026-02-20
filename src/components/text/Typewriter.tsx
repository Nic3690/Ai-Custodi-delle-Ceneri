import { useState, useEffect, useRef, useMemo } from "react";

// Module-level Set to track played animations
// Resets on page reload, persists during SPA navigation
const playedAnimations = new Set<string>();

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  storageKey?: string;
  eager?: boolean;
}

const Typewriter = ({ text, speed = 15, delay = 0, className = "", storageKey, eager = false }: TypewriterProps) => {
  const effectiveKey = useMemo(() => {
    return storageKey || `typewriter_${text.slice(0, 30)}`;
  }, [storageKey, text]);

  const hasPlayedBefore = useMemo(() => {
    return playedAnimations.has(effectiveKey);
  }, [effectiveKey]);

  const [displayedText, setDisplayedText] = useState(hasPlayedBefore ? text : "");
  const [started, setStarted] = useState(hasPlayedBefore);
  const [isComplete, setIsComplete] = useState(hasPlayedBefore);
  const [isVisible, setIsVisible] = useState(eager);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasPlayedBefore || eager) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasPlayedBefore, eager]);

  useEffect(() => {
    if (!isVisible || hasPlayedBefore) return;

    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, isVisible, hasPlayedBefore]);

  useEffect(() => {
    if (!started || isComplete) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      playedAnimations.add(effectiveKey);
    }
  }, [displayedText, text, speed, started, isComplete, effectiveKey]);

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            visibility: index < displayedText.length ? "visible" : "hidden",
          }}
        >
          {char}
        </span>
      ))}
      {started && !isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default Typewriter;
