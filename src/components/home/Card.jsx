import Image from "next/image";
import React from "react";
import Button from "../ui/Button";

const Card = () => {
  return (
    <div className="border p-3 mx-6 my-8 cursor-pointer hover:bg-[#F4F4F4] transition-all">
      <div className="flex items-center justify-between">
        <p className="bg-primary text-white p-3">AB+</p>
        <p className="text-gray-200 font-semibold">ID: #133</p>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-8 ">
        <div className="flex items-center gap-x-1.5">
          <Image
            src="/assets/icons/hospital.svg"
            alt="Logo"
            width={25}
            height={25}
          />
          <span className="">Lab Aid Hospital, Dhaka</span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <Image
            src="/assets/icons/bag.svg"
            alt="Logo"
            width={25}
            height={25}
          />
          <span className="">২ ব্যাগ</span>
        </div>
        <div className="flex items-center gap-x-1.5">
          <Image
            src="/assets/icons/heart.svg"
            alt="Logo"
            width={25}
            height={25}
          />
          <span className="">সিজার অপারেশন</span>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <Button
          className="px-8 py-2 text-sm"
          icon="/assets/icons/arrow-right.svg"
          iconSize="20"
          text="বিস্তারিত"
          iconPosition="right"
        />
      </div>
    </div>
  );
};

export default Card;
