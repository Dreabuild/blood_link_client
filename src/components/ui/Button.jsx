import Image from "next/image";
import React from "react";

const Button = ({
  text,
  icon,
  iconSize,
  iconPosition,
  className,
  isOutline,
  style,
  onClick,
  type,
}) => {
  return (
    <button
      className={`flex ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      } items-center gap-x-1 p-3 justify-center   font-bold ${
        isOutline
          ? "hover:bg-primary text-primary hover:text-white"
          : "bg-primary text-white"
      }  transition-all ${className}`}
      style={style}
      onClick={onClick}
      type={type}
    >
      {icon && (
        <Image src={icon} alt="Icon" width={iconSize} height={iconSize} />
      )}
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
