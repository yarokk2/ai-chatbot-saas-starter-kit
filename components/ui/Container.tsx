import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  const classes = [
    "mx-auto",
    "w-full",
    "max-w-7xl",
    "px-6",
    "lg:px-8",
    className,
  ].join(" ");

  return <div className={classes}>{children}</div>;
}