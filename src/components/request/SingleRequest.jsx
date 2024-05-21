"use client";
import Button from "@/components/ui/Button";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter from 'next/router'
import Image from "next/image";
import axios from "axios"; // Import axios
import { RWebShare } from "react-web-share";
import Link from "next/link";
import Loader from "../ui/Loader";
import dayjs from "dayjs";

const SingleRequest = () => {
  const router = useRouter();
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);

  useEffect(() => {
    const getSingleRequest = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/request/${id}`
        );
        if (res.status === 200) {
          setRequest(res.data.data);
          console.log(res?.data?.data);
        }
      } catch (e) {
        setError(true);
        console.log(e);
      }
      setLoading(false);
    };

    if (id) {
      getSingleRequest();
    }
  }, [id]); // Added 'id' as a dependency for useEffect

  const updateCallCount = async (id) => {
    setLoadingPhone(true);
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
    setLoadingPhone(false);
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-auto small:h-[62vh] h-[540px] pb-[10vh]">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="flex items-center flex-col ">
            {" "}
            <Image
              src="/assets/404.svg"
              alt="Not Found"
              width={400}
              height={400}
              className="group-hover:scale-90 transition-all"
            />
            <Link
              href="/"
              className="text-primary text-lg font-medium hover:no-underline underline"
            >
              হোমে ফিরে যান{" "}
            </Link>
          </div>
        ) : (
          <>
            <div className="  lg:mx-14 mx-5 mt-8 py-6">
              <div className="flex items-center justify-between">
                <p className="bg-primary text-white p-3 uppercase">
                  {request.blood_group}
                </p>
                <RWebShare
                  data={{
                    text: `${request.blood_group} Blood request`,
                    title: `${request.blood_group} Blood request`,
                    url: `/request/${id}`,
                  }}
                >
                  <button className="w-12 h-12 bg-red-50 flex items-center justify-center py-2 group">
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
                  রক্তের গ্রুপ:{" "}
                  <span className="text-primary">
                    {request.blood_group ?? "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  হিমোগ্লোবিন পয়েন্ট:{" "}
                  <span className="text-primary">
                    {request.hemoglobin_point ?? "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  রোগীর সমস্যা:{" "}
                  <span className="text-primary">
                    {request.patient_problem ?? "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  রোগীর জেন্ডার:{" "}
                  <span className="text-primary">
                    {request.gender === "female"
                      ? "মহিলা"
                      : request.gender === "male"
                      ? "পুরুষ"
                      : "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  রক্তের পরিমান:{" "}
                  <span className="text-primary">
                    {request.amount_of_blood ?? "দেওয়া হয় নি"} ব্যাগ
                  </span>
                </p>
                <p className="text-gray-500">
                  জেলা:{" "}
                  <span className="text-primary">
                    {request.district ?? "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  রক্তদানের তারিখ:{" "}
                  <span className="text-primary">
                    {request.urgent
                      ? "যত দ্রুত সম্ভব"
                      : dayjs(request?.delivery_time).format("DD/MM/YYYY")}
                  </span>
                </p>
                <p className="text-gray-500">
                  রক্তদানের স্থান:{" "}
                  <span className="text-primary">
                    {request.hospital_name ?? "দেওয়া হয় নি"}
                  </span>
                </p>
                <p className="text-gray-500">
                  সংক্ষিপ্ত বিবরণ:{" "}
                  <span className="text-gray-300">
                    {!request.description || request.description === ""
                      ? "দেওয়া হয় নি"
                      : request.description}
                  </span>
                </p>
              </div>
            </div>
            <div className="border-gray-200 border-t mt-4">
              <div className="lg:mx-14 mx-5 py-6 flex items-center justify-between">
                <p className="text-primary font-medium">#{request.id ?? 0}</p>
                <p className="text-gray-100">
                  আবেদনটি দেখা হয়েছে: {request.views_count ?? 0} বার
                </p>
              </div>
              <div className=" lg:mx-14 mx-5 gap-x-6 flex items-center justify-center">
                <button
                  onClick={() => updateCallCount(request.id)}
                  className=" bg-red-50 flex items-center justify-center p-3 group relative"
                  disabled={loadingPhone}
                >
                  <div className="absolute -top-2 -right-2 bg-primary rounded-3xl  text-white text-xs px-2 py-1">
                    {request?.call_count ?? 0}
                  </div>
                  {loadingPhone ? (
                    <div className="btnLoader"></div>
                  ) : (
                    <Image
                      src="/assets/icons/phone.svg"
                      alt="Arrow"
                      width={24}
                      height={24}
                      className="group-hover:scale-90 transition-all"
                    />
                  )}
                  <p className="font-bold text-primary mx-2">কল করুন</p>
                </button>
              </div>
            </div>
          </>
        )}
        {/* buttons  */}
      </div>
      <div className="w-full absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <Button
          className="w-1/2"
          style={{ borderRight: "3px solid #BF0000" }}
          icon="/assets/icons/home.svg"
          iconSize="20"
          text="হোম"
          isHome={true}
          isOutline
          onClick={() => router.push("/")}
        />

        <Button
          className="w-1/2"
          icon="/assets/icons/folder.svg"
          iconSize="20"
          text="নতুন আবেদন"
          isOutline
          isHome={true}
          onClick={() => router.push("/request")}
        />
      </div>
    </div>
  );
};

export default SingleRequest;
