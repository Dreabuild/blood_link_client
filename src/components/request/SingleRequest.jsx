"use client";
import Button from "@/components/ui/Button";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const SingleRequest = () => {
  const router = useRouter();
  const data = {
    group: "AB+",
    hemoglobin: "N/A",
    problem: "Uterine Tumor",
    quantity: 2,
    district: "চট্টগ্রাম",
    date: "যত দ্রুত সম্ভব",
    place: "Blue Vue Healthcare, চট্টগ্রাম",
    placedDate: "10-May-2024, Friday",
    watchCount: 16,
    gender: "male",
    id: 133,
  };
  return (
    <div>
      <div className="  mx-6 mt-8 p-6">
        <div className="flex items-center justify-between">
          <p className="bg-primary text-white p-3">AB+</p>
          <button className="w-12 h-12 bg-red-50 flex items-center justify-center p-2 group">
            <Image
              src="/assets/icons/share.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="group-hover:scale-90 transition-all"
            />
          </button>
        </div>
        <div className="mt-8 space-y-2">
          <p className="text-gray-500">
            রক্তের গ্রুপ: <span className="text-primary">{data.group}</span>
          </p>
          <p className="text-gray-500">
            হিমোগ্লোবিন পয়েন্ট:{" "}
            <span className="text-primary">{data.hemoglobin}</span>
          </p>
          <p className="text-gray-500">
            রোগীর সমস্যা: <span className="text-primary">{data.problem}</span>
          </p>
          <p className="text-gray-500">
            রোগীর জেন্ডার: <span className="text-primary">{data.gender === "female" ? "মহিলা" : data.gender === "male" ? "পুরুষ" : "অন্যান্য"}</span>
          </p>
          <p className="text-gray-500">
            রক্তের পরিমান:{" "}
            <span className="text-primary">{data.quantity} ব্যাগ</span>
          </p>
          <p className="text-gray-500">
            জেলা: <span className="text-primary">{data.district}</span>
          </p>
          <p className="text-gray-500">
            রক্তদানের তারিখ: <span className="text-primary">{data.date}</span>
          </p>
          <p className="text-gray-500">
            রক্তদানের স্থান: <span className="text-primary">{data.place}</span>
          </p>
          <p className="text-gray-500">
            সংক্ষিপ্ত বিবরণ:{" "}
            <span className="text-gray-300">{data.placedDate}</span>
          </p>
        </div>
      </div>
      <div className="border-gray-200 border-t mt-4">
        <div className="mx-6 p-6 flex items-center justify-between">
          <p className="text-primary font-medium">#{data.id}</p>
          <p className="text-gray-100">
            আবেদনটি দেখা হয়েছে: {data.watchCount} বার
          </p>
        </div>
        <div className="  gap-x-6 flex items-center justify-center">
          <button className=" bg-red-50 flex items-center justify-center p-3 group relative">
            <div className="absolute -top-2 -right-2 bg-primary rounded-3xl  text-white text-xs px-2 py-1">
              14
            </div>
            <Image
              src="/assets/icons/phone.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="group-hover:scale-90 transition-all"
            />
            <p className="font-bold text-primary mx-2">কল করো</p>
          </button>
          <button className=" bg-[#E6F9EA] flex items-center justify-center p-3 group relative">
            <div className="absolute -top-2 -right-2 bg-[#40C351] rounded-3xl  text-white text-xs px-2 py-1">
              67
            </div>
            <Image
              src="/assets/icons/WhatsApp.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="group-hover:scale-90 transition-all"
            />
          </button>
        </div>
      </div>
      {/* buttons  */}

      <div className="w-full absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <Button
          className="w-1/2"
          style={{ borderRight: "3px solid #BF0000" }}
          icon="/assets/icons/bloodbag.svg"
          iconSize="20"
          text="ব্যাংক হোম"
          isOutline
          onClick={() => router.push("/bank-home")}
        />

        <Button
          className="w-1/2"
          icon="/assets/icons/folder.svg"
          iconSize="20"
          text="নতুন আবেদন"
          isOutline
          onClick={() => router.push("/request")}
        />
      </div>
    </div>
  );
};

export default SingleRequest;
