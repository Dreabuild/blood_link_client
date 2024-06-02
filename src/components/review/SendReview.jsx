"use client";
import Button from "@/components/ui/Button";
import { bloodGroups, districts, genders, relations } from "@/constants/data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Select from "react-tailwindcss-select";
import Datepicker from "react-tailwindcss-datepicker";

// Form component
const SendReview = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/request/create`,
        data
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("রিভিওটি সাবমিট করা হয়েছে");
        router.push("/");
      } else {
        console.log("Request submission failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("রিভিওটি সাবমিট করা যায় নি");
    }
    // reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto small:h-[66vh] h-[545px] pb-[10vh] px-5 lg:px-14 pt-6">
        <p className="text-center text-2xl my-6">
          রিভিও দিতে নিচের তথ্য পূরন করুন
        </p>

        {/* Primary Info Section */}
        <Section title="প্রাথমিক তথ্য">
          <TextInput
            id="name"
            placeholder="আপনার নাম"
            register={register("name", { required: true })}
            error={errors.name && "আপনার নাম প্রয়োজন"}
          />
          <TextInput
            id="email"
            type="email"
            placeholder="আপনার ইমেইল"
            register={register("email", { required: true })}
            error={errors.email && "আপনার ইমেইল প্রয়োজন"}
          />
          <TextInput
            id="phone"
            type="tel"
            placeholder="আপনার মোবাইল নাম্বার"
            register={register("phone", { required: true })}
            error={errors.phone && "আপনার মোবাইল নাম্বার প্রয়োজন"}
          />

          <textarea
            id="description"
            className="block mt-8 w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
            placeholder="আপনার মন্তব্য লিখুন"
            rows={4}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </Section>
      </div>
      <div className="w-full absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <Button
          className="w-1/2"
          style={{ borderRight: "3px solid #BF0000" }}
          icon="LiaHospitalAltSolid"
          iconSize="20"
          text="হোম"
          isHome={true}
          isOutline
          onClick={() => router.push("/")}
        />

        <Button
          className="w-1/2"
          type="submit"
          text="সাবমিট"
          isLoading={loading}
        />
      </div>
      <Toaster />
    </form>
  );
};

// Section component
const Section = ({ title, children }) => (
  <div className="mt-8">
    <p className="text-primary text-xl mb-4">{title}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

// TextInput component
const TextInput = ({ id, placeholder, type = "text", register, error }) => (
  <>
    {/* Code of new input fields. not working currently if you don't add required.   */}

    {/* <div className="input-group">
      <input
        type={type}
        id={id}
        name={id}
        className={`input rounded-none w-full ${
          error ? "border-red-500" : "border-gray-500"
        }`}
        autoComplete="off"
        {...register}
      />
      <label className="user-label">{placeholder}</label>
    </div> */}

    {/* Code of old input  */}

    <input
      type={type}
      id={id}
      className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary"
      placeholder={placeholder}
      {...register}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </>
);

export default SendReview;
