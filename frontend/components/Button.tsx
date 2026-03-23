"use client";

import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  display?: string;
  href?: string;               // If present → acts as Link
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  paddingX?: string;
  paddingY?: string;
  rounded?: string;
  fontSize?: string;
  fontWeight?: string;
  tracking?: string;
  className?: string;
  onClick?: () => void;
  target?: string;             // optional (e.g., "_blank")
}

const Button: React.FC<ButtonProps> = ({
  children,
  display ="inline-flex",
  href,
  textColor = "text-white",
  bgColor = "bg-emerald",
  hoverBgColor = "hover:bg-emerald-light",
  paddingX = "px-5",
  paddingY = "py-2.5",
  rounded = "rounded-md",
  fontSize = "text-sm",
  fontWeight = "font-semibold",
  tracking = "tracking-wide",
  className = "",
  onClick,
  target,
}) => {
  const classes = `${bgColor} ${textColor} ${fontSize} ${fontWeight} ${paddingX} ${paddingY} ${rounded} ${tracking} ${display} items-center justify-center ${hoverBgColor} transition-colors duration-200 ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} target={target} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;