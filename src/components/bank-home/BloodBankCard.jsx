import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

const Card = () => {
  return (
    <div className="group border mx-6 my-8 cursor-pointer hover:bg-[#F4F4F4] transition-all p-7 relative">
      <div className="flex items-center justify-between relative">
        <div className="w-1/2 relative z-10">
          <p className="font-semibold text-primary mb-2">#Dhk01</p>
          <p className="font-medium">New Bangladesh Pathology & Blood Bank</p>
          <p className="font-medium text-gray-200 mt-2">
            House #69, Road #9/A, Dhanmondi R/A
          </p>
          <div className="mt-6 flex items-center justify-between w-36 gap-x-2">
            <Button text="Call" className="w-full" />
            <Button text="SMS" className="w-full" />
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
