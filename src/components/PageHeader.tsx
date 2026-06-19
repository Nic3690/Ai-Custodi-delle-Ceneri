import { ReactNode } from "react";
import { ScanBars } from "@/components/ScanBars";
import { InitCounter } from "@/components/InitCounter";

interface PageHeaderProps {
  kicker?: string;
  title: string;
  intro?: ReactNode;
}

export const PageHeader = ({ kicker, title, intro }: PageHeaderProps) => (
  <header className="max-w-6xl mx-auto w-full px-5 md:px-8 pt-14 md:pt-16 pb-6 md:pb-10">
    {kicker && (
      <div
        className="flex items-center gap-3 mb-5 font-mono text-xs tracking-[0.3em]"
        style={{ color: "#fe4a00" }}
      >
        <span>{kicker}</span>
        <ScanBars />
        <InitCounter />
      </div>
    )}
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-foreground">
      {title}
    </h1>
    {intro && (
      <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
        {intro}
      </p>
    )}
  </header>
);
