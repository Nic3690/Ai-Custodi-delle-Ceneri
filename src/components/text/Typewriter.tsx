import { useState, useEffect, useRef } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const Typewriter = ({ text, speed = 15, delay = 0, className = "" }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay, isVisible]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, started]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      {started && displayedText.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default Typewriter;
