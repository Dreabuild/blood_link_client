import React from "react";
import { LiaHospitalAltSolid } from "react-icons/lia";
import { FiFolderPlus } from "react-icons/fi";
import Loader from "./Loader";
import Image from "next/image";

const Button = ({
  text,
  icon,
  isHome,
  iconSize,
  iconPosition,
  className,
  isOutline,
  style,
  onClick,
  type = "button",
  isLoading = false,
  isDisabled = false,
}) => {
  // Determine which icon component to use based on the icon prop
  const IconComponent =
    icon === "LiaHospitalAltSolid" ? LiaHospitalAltSolid : FiFolderPlus;

  return (
    <button
      className={`flex z-[1000] bg-[#fff] hover:bg-opacity-95 lg:md:text-[16px] text-[14px]  ${
        iconPosition === "right" ? "flex-row-reverse" : ""
      } items-center gap-x-2 lg:md:p-3 p-2 justify-center   font-bold ${
        isOutline
          ? "hover:bg-primary text-primary hover:text-white"
          : "bg-primary text-white "
      }  transition-all  ${className} `}
      style={style}
      onClick={onClick}
      type={type}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        isOutline ? (
          <div className="btnLoader"></div>
        ) : (
          <div className="btnLoaderWhite"></div>
        )
      ) : (
        <>
          {/* Render the icon component */}
          {icon &&
            (isHome ? (
              <IconComponent size={iconSize} />
            ) : (
              <Image src={icon} alt="Icon" width={iconSize} height={iconSize} />
            ))}
          <span className="">{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
