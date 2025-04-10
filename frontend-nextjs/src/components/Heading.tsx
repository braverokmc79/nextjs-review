import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return <h1 className={`${className} font-bold font-orbitron pb-3 text-2xl`}>{children}</h1>;
};
