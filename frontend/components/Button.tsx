// components/Button.tsx
import React from "react";

interface ButtonProps {
  text: string;
  textColor?: string;          // Tailwind text color class, e.g., "text-white"
  bgColor?: string;            // Tailwind bg color class, e.g., "bg-emerald"
  hoverBgColor?: string;       // Tailwind hover bg color, e.g., "hover:bg-emerald-light"
  paddingX?: string;           // Tailwind px, e.g., "px-5"
  paddingY?: string;           // Tailwind py, e.g., "py-3"
  rounded?: string;            // Tailwind border radius, e.g., "rounded-sm"
  fontSize?: string;           // Tailwind font size, e.g., "text-sm"
  fontWeight?: string;         // Tailwind font weight, e.g., "font-semibold"
  tracking?: string;           // Tailwind tracking, e.g., "tracking-wide"
  className?: string;          // Extra classes if needed
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  textColor = "text-white",
  bgColor = "bg-emerald",
  hoverBgColor = "hover:bg-emerald-light",
  paddingX = "px-5",
  paddingY = "py-2",
  rounded = "rounded-sm",
  fontSize = "text-sm",
  fontWeight = "font-semibold",
  tracking = "tracking-wide",
  className = "",
  onClick,
}) => {
  const classes = `${bgColor} ${textColor} ${fontSize} ${fontWeight} ${paddingX} ${paddingY} ${rounded} ${tracking} text-center ${hoverBgColor} transition-colors duration-200 ${className}`;
  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;