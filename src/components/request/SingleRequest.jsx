"use client";
import Button from "@/components/ui/Button";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter from 'next/router'
import Image from "next/image";
import axios from "axios"; // Import axios
import { RWebShare } from "react-web-share";
import Link from "next/link";

const SingleRequest = () => {
  const router = useRouter();
  const { id } = useParams();
  const [request, setRequest] = useState({});
  useEffect(() => {
    const getSingleRequest = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/request/${id}`
        );
        if (res.status === 200) {
          setRequest(res.data.data);
          console.log(res?.data?.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (id) {
      getSingleRequest();
    }
  }, [id]); // Added 'id' as a dependency for useEffect

    const updateMessageCount = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/request/message/${id}`
      );
      if (res.status === 200) {
        setRequest((prev) => ({
          ...prev,
          message_count: prev.message_count + 1,
        }));
        window.open(`https://wa.me/${request.whatsapp_number}`, '_blank');
      }
    } catch (e) {
      console.log(e);
    }
  };

const updateCallCount = async (id) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/request/call/${id}`
      );
      if (res.status === 200) {
        setRequest((prev) => ({
          ...prev,
          call_count: prev.call_count + 1,
        }));
        window.location.href = `tel:${request.mobile_number[0]}`;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="overflow-hidden">
    <div className="overflow-auto h-[550px] pb-[10vh]">
      <div className="  mx-6 mt-8 p-6">
        <div className="flex items-center justify-between">
          <p className="bg-primary text-white p-3 uppercase">{request.blood_group}</p>
          <RWebShare
            data={{
              text: `${request.group} Blood request`,
              title: `${request.group} Blood request`,
              url: `/request/${id}`,
            }}
          >
            <button className="w-12 h-12 bg-red-50 flex items-center justify-center p-2 group">
              <Image
                src="/assets/icons/share.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="group-hover:scale-90 transition-all"
              />
            </button>
          </RWebShare>
        </div>
        <div className="mt-8 space-y-2">
          <p className="text-gray-500">
            রক্তের গ্রুপ: <span className="text-primary">{request.blood_group}</span>
          </p>
          <p className="text-gray-500">
            হিমোগ্লোবিন পয়েন্ট:{" "}
            <span className="text-primary">{request.hemoglobin_point}</span>
          </p>
          <p className="text-gray-500">
            রোগীর সমস্যা:{" "}
            <span className="text-primary">{request.patient_problem}</span>
          </p>
          <p className="text-gray-500">
            রোগীর জেন্ডার:{" "}
            <span className="text-primary">
              {request.gender === "female"
                ? "মহিলা"
                : request.gender === "male"
                ? "পুরুষ"
                : "অন্যান্য"}
            </span>
          </p>
          <p className="text-gray-500">
            রক্তের পরিমান:{" "}
            <span className="text-primary">{request.amount_of_blood} ব্যাগ</span>
          </p>
          <p className="text-gray-500">
            জেলা: <span className="text-primary">{request.district}</span>
          </p>
          <p className="text-gray-500">
            রক্তদানের তারিখ:{" "}
            <span className="text-primary">{request.urgent ? "যত দ্রুত সম্ভব" : request?.delivery_time}</span>
          </p>
          <p className="text-gray-500">
            রক্তদানের স্থান:{" "}
            <span className="text-primary">{request.hospital_name}</span>
          </p>
          <p className="text-gray-500">
            সংক্ষিপ্ত বিবরণ:{" "}
            <span className="text-gray-300">{request.description}</span>
          </p>
        </div>
      </div>
      <div className="border-gray-200 border-t mt-4">
        <div className="mx-6 p-6 flex items-center justify-between">
          <p className="text-primary font-medium">#{request.id}</p>
          <p className="text-gray-100">
            আবেদনটি দেখা হয়েছে: {request.views_count} বার
          </p>
        </div>
        <div className="  gap-x-6 flex items-center justify-center">
          <button
          onClick={() => updateCallCount(request.id)}
          className=" bg-red-50 flex items-center justify-center p-3 group relative">
            <div className="absolute -top-2 -right-2 bg-primary rounded-3xl  text-white text-xs px-2 py-1">
              {request?.call_count}
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
          <button
          onClick={() => updateMessageCount(request.id)}
            className=" bg-[#E6F9EA] flex items-center justify-center p-3 group relative">
            <div className="absolute -top-2 -right-2 bg-[#40C351] rounded-3xl  text-white text-xs px-2 py-1">
              {request?.message_count}
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
</div>
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
