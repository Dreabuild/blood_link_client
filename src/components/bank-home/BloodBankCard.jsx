"use client";
import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

const Card = ({ bank }) => {
  console.log(bank);
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
    <div className="group border lg:mx-14 mx-5 my-2  hover:bg-[#F4F4F4] transition-all  relative">
      <div className="flex items-center justify-between relative">
        <div className="lg:w-[55%] w-[70%] relative z-10 p-3 lg:p-7">
          <p className="font-semibold text-primary mb-2 capitalize">
            #{bank?.id}
          </p>
          <p className="font-medium capitalize">{bank?.name}</p>
          <p className="font-medium text-gray-200 mt-1 capitalize">
            {bank?.address}
          </p>
          <div className="mt-6 flex items-center justify-between  gap-x-2">
            <Button
              text="কল"
              className="w-full px-4 py-1.5"
              onClick={handleCall}
              icon="/assets/icons/call.svg"
              iconSize={19}
            />
            <Button
              text="মেসেজ"
              className="w-full px-4 py-1.5"
              onClick={handleSMS}
              icon="/assets/icons/message.svg"
              iconSize={19}
            />
          </div>
        </div>
        <img
          src="/assets/map.png"
          alt="map"
          objectFit="cover"
          className="gradient-mask-l-50 lg:w-[65%] w-[50%] absolute right-0 top-0 object-cover h-full"
        />
      </div>
    </div>
  );
};

export default Card;
