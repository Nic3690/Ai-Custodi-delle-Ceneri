import { ReactNode } from "react";

interface PageHeaderProps {
  kicker?: string;
  title: string;
  intro?: ReactNode;
}

export const PageHeader = ({ kicker, title, intro }: PageHeaderProps) => (
  <header className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16 pt-14 md:pt-28 pb-10 md:pb-20">
    {kicker && (
      <p className="font-mono text-xs tracking-[0.3em] mb-5" style={{ color: "#fe4a00" }}>
        {kicker}
      </p>
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
