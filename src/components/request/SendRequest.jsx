"use client";
import Button from "@/components/ui/Button";
import { bloodGroups, districts } from "@/constants/data";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


const SendRequest = () => {
  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/request/create`, {
        ...data,
        amount_of_blood: Number(data.amount_of_blood),
        hemoglobin_point: parseFloat(data.hemoglobin_point)

      });
      if (res.status == 200) {
        toast('আবেদন সাবমিটেড')
      }

    } catch (e) {
      console.log(e)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-8">
        <p className="text-center text-2xl my-6">
          উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
        </p>
        {/* primary info */}
        <div className="mt-12 ">
          <p className="text-primary text-xl mb-4">প্রাথমিক তথ্য</p>
          <div className="space-y-4">
            <select
              id="blood_group"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
              {...register("blood_group", { required: true })}
            >
              <option value="">রক্তের গ্রুপ</option>
              {bloodGroups.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="float"
              id="hemoglobin"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="হিমোগ্লোবিন পয়েন্ট"
              {...register("hemoglobin_point", { required: false })}
            />
            <input
              type="number"
              id="quantity"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="রক্তের পরিমাণ"
              {...register("amount_of_blood", { required: true })}
            />
            <input
              type="text"
              id="problem"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="রোগীর সমস্যা"
              {...register("patient_problem", { required: true })}
            />
          </div>
        </div>
        {/* other info */}
        <div className="mt-8">
          <p className="text-primary text-xl mb-4">অন্যান্য তথ্য</p>
          <div className="space-y-4">
            <select
              id="district"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
              {...register("district", { required: true })}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districts.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="hospital"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="হাসপাতালের নাম"
              {...register("hospital_name", { required: true })}
            />
            <input
              type="tel"
              id="phone"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="মোবাইল নাম্বার"
              {...register("mobile_number", { required: true })}
            />
            <input
              type="tel"
              id="whatsapp"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="হোয়াটএপস নাম্বার"
              {...register("whatsapp_number", { required: true })}
            />
            <input
              type="link"
              id="facebook"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="ফেসবুক একাউন্টের লিংক(ঐচ্ছিক)"
              {...register("facebook_account_url")}
            />
            <select
              id="gender"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
              {...register("gender")}
            >
              <option value="">রোগীর জেন্ডার(ঐচ্ছিক)</option>
              <option value="male">পুরুষ</option>
              <option value="female">মহিলা</option>
              <option value="others">অন্যান্য</option>
            </select>
            <input
              type="text"
              id="relation"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="আপনি রোগীর কি হোন?(ঐচ্ছিক)"
              {...register("relation")}
            />
            <div className="my-4">
              <label className="cursor-pointer flex items-center gap-x-2">
                <input
                  {...register("urgent", { required: false })}
                  type="checkbox" className="hidden checkbox" />
                <svg
                  viewBox="0 0 64 64"
                  height="1.1em"
                  width="1.1em"
                  className="overflow-visible"
                >
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className="path"
                  />
                </svg>
                <span className="text-primary">
                  যত দ্রুত সম্ভব রক্তের প্রয়োজন
                </span>
              </label>
            </div>
            <input
              type="date"
              id="relation"
              className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="আপনি রোগীর কি হোন?(ঐচ্ছিক)"
              {...register("delivery_time", { required: true })}
            />

            <textarea
              id="description"
              className="block mt-4 w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
              placeholder="বিস্তারিত(ঐচ্ছিক)"
              rows={4}
              {...register("description")}
            />
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit" text="সাবমিট" />
      <Toaster />
    </form>
  );
};

export default SendRequest;
