import React from "react";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { FiFolderPlus } from "react-icons/fi";

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
  // Determine which icon component to use based on the icon prop
  const IconComponent = icon === "LiaHospitalAltSolid" ? LiaHospitalAltSolid : FiFolderPlus;

  return (
    <button
      className={`flex bg-[#fff] ${iconPosition === "right" ? "flex-row-reverse" : ""
        } items-center gap-x-2 p-3 justify-center   font-bold ${isOutline
          ? "hover:bg-primary text-primary hover:text-white"
          : "bg-primary text-white"
        }  transition-all ${className}`}
      style={style}
      onClick={onClick}
      type={type}
    >
      {/* Render the icon component */}
      {icon && <IconComponent size={iconSize} />}
      <span className="">{text}</span>
    </button>
  );
};

export default Button;
