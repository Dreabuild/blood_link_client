import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

const Card = () => {
  return (
    <div className="group border mx-6 my-8 cursor-pointer hover:bg-[#F4F4F4] transition-all p-7">
      <div className="  ">
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-x-1">
            <Image
              src="/assets/icons/blood.svg"
              alt="Arrow"
              width={20}
              height={20}
            />
            <p className="font-medium">New Bangladesh Pathology & Blood Bank</p>
          </div>
          <p className="text-gray-200 font-semibold">#dhk01</p>
        </div>
        <div className="mt-3 flex items-center gap-x-1">
          <Image
            src="/assets/icons/location.svg"
            alt="Arrow"
            width={20}
            height={20}
          />
          <p className="font-medium text-gray-200">
            House #69, Road #9/A, Dhanmondi R/A
          </p>
        </div>
        <div className="mt-9 flex items-center justify-between">
          <div className="w-20 space-y-2">
            <Button text="Call" className="w-full" />
            <Button text="SMS" className="w-full" />
          </div>
          <Image src="/assets/map.png" alt="map" width={150} height={90} />
        </div>
      </div>
    </div>
  );
};

export default Card;
