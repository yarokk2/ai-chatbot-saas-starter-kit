import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  const classes = [
    "rounded-3xl",
    "border border-white/10",
    "bg-white/5",
    "backdrop-blur-xl",
    "shadow-2xl",
    "p-8",
    className,
  ].join(" ");

  return <div className={classes}>{children}</div>;
}