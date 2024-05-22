"use client";
import React from "react";
import Button from "../ui/Button";
import Image from "next/image";
import useMediaQuery from "use-media-query-hook";

const Card = ({ bank }) => {
  console.log(bank);
  const isSmallDevice = useMediaQuery('(max-width: 640px)');
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
          <div className="mt-6 flex items-center lg:md:justify-between  gap-x-2">
            <Button
              text="কল"
              className="lg:md:w-full w-[38%] lg:md:px-4  lg:md:py-1.5 py-2"
              onClick={handleCall}
              icon="/assets/icons/call.svg"
              iconSize={isSmallDevice ? 15 : 19}
            />
            <Button
              text="মেসেজ"
              className="lg:md:w-full w-[38%] lg:md:px-4 lg:md:py-1.5 py-2"
              onClick={handleSMS}
              icon="/assets/icons/message.svg"
              iconSize={isSmallDevice ? 15 : 19}
            />
          </div>
        </div>
        <img
          src={bank?.image}
          alt="map"
          objectFit="cover"
          className="gradient-mask-l-50 lg:w-[65%] w-[50%] absolute right-0 top-0 object-cover h-full"
        />

        {/* <Image
          src={bank?.image}
          alt="map"
          layout="fill"
          objectFit="cover"
          className="gradient-mask-l-50 lg:w-[65%] w-[50%] absolute right-0 top-0"
        /> */}
      </div>
    </div>
  );
};

export default Card;
