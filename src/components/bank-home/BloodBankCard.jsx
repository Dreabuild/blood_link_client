"use client";
import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

const Card = ({ bank }) => {
  console.log(bank)
   const handleCall = () => {
     if (bank?.contact[0]) {
      window.location.href = `tel:${bank?.contact[0]}`;
    } else {
      alert("Phone number is not available");
    }
  };

  const handleSMS = () => {
    if (bank?.contact[0]) {
      window.location.href = `sms:${bank?.contact[0]}`;
    } else {
      alert("SMS number is not available");
    }
  };
  return (
    <div className="group border mx-6 my-8 cursor-pointer hover:bg-[#F4F4F4] transition-all p-7 relative">
      <div className="flex items-center justify-between relative">
        <div className="w-1/2 relative z-10">
          <p className="font-semibold text-primary mb-2 capitalize">#{bank?.id}</p>
          <p className="font-medium capitalize">{bank?.name}</p>
          <p className="font-medium text-gray-200 mt-2 capitalize">
            {bank?.address}
          </p>
          <div className="mt-6 flex items-center justify-between w-36 gap-x-2">
            <Button text="Call" className="w-full" onClick={handleCall} />
            <Button text="SMS" className="w-full" onClick={handleSMS} />
          </div>
        </div>
        {/* <div className="absolute inset-0 w-full left-1/2 transform -translate-x-1/2 z-0">
          <div className="h-full w-full bg-gradient-to-r from-white to-transparent absolute left-0"></div>
          <Image
            src="/assets/map.png"
            alt="map"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Card;
