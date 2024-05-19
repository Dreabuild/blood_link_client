"use client";
import Button from "@/components/ui/Button";
import { bloodGroups, districts } from "@/constants/data";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Form component
const SendRequest = () => {
  const [loading, setLoading] = useState(false);
  const [isUrgent, setIsUrgent] = useState(true);
  const [phoneInputCount, setPhoneInputCount] = useState(1);
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

    // Collect phone numbers into an array
    const phoneNumbers = [];
    for (let i = 0; i < phoneInputCount; i++) {
      if (data[`mobile_number${i}`]) {
        phoneNumbers.push(data[`mobile_number${i}`]);
      }
      delete data[`mobile_number${i}`]; // Remove individual mobile_number fields
    }

    // Format the data to include the phone numbers array
    const formattedData = {
      ...data,
      mobile_number: phoneNumbers,
      amount_of_blood: Number(data.amount_of_blood),
      hemoglobin_point: parseFloat(data.hemoglobin_point),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/request/create`,
        formattedData
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("আবেদনটি সাবমিট করা হয়েছে");
        router.push("/");
      } else {
        console.log("Request submission failed");
      }
    } catch (e) {
      console.log(e);
      toast.error("আবেদনটি সাবমিট করা যায় নি");
    }
    // reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto h-[547px] pb-[10vh] px-8 pt-8">
        <p className="text-center text-2xl my-6">
          উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
        </p>

        {/* Primary Info Section */}
        <Section title="প্রাথমিক তথ্য">
          <SelectInput
            id="blood_group"
            options={bloodGroups}
            placeholder="রক্তের গ্রুপ"
            register={register("blood_group", { required: true })}
            error={errors.blood_group && "রক্তের গ্রুপ প্রয়োজন"}
          />
          <TextInput
            id="hemoglobin"
            placeholder="হিমোগ্লোবিন পয়েন্ট (ঐচ্ছিক)"
            register={register("hemoglobin_point")}
          />
          <TextInput
            id="quantity"
            placeholder="রক্তের পরিমাণ (ব্যাগ সংখ্যা)"
            type="number"
            register={register("amount_of_blood", { required: true })}
            error={errors.amount_of_blood && "রক্তের পরিমাণ প্রয়োজন"}
          />
          <TextInput
            id="problem"
            placeholder="রোগীর সমস্যা"
            register={register("patient_problem", { required: true })}
            error={errors.patient_problem && "রোগীর সমস্যা প্রয়োজন"}
          />
        </Section>

        {/* Other Info Section */}
        <Section title="অন্যান্য তথ্য">
          <SelectInput
            id="district"
            options={districts}
            placeholder="জেলা নির্বাচন করুন"
            register={register("district", { required: true })}
            error={errors.district && "জেলা নির্বাচন প্রয়োজন"}
          />
          <TextInput
            id="hospital"
            placeholder="হাসপাতালের নাম"
            register={register("hospital_name", { required: true })}
            error={errors.hospital_name && "হাসপাতালের নাম প্রয়োজন"}
          />
          <PhoneNumbers
            phoneInputCount={phoneInputCount}
            setPhoneInputCount={setPhoneInputCount}
            register={register}
            errors={errors}
          />
          <TextInput
            id="whatsapp"
            placeholder="হোয়াটস অ্যাপ নাম্বার"
            type="tel"
            register={register("whatsapp_number", {
              required: "হোয়াটস অ্যাপ প্রয়োজন",
              pattern: {
                value: /^\d{11}$|^\d{13}$|^\d{14}$/,
                message: "১১ সংখ্যার নাম্বার দিন",
              },
            })}
            error={errors.whatsapp_number && errors.whatsapp_number.message}
          />
          <TextInput
            id="facebook"
            placeholder="ফেসবুক একাউন্টের লিংক (ঐচ্ছিক)"
            type="link"
            register={register("facebook_account_url")}
          />
          <SelectInput
            id="gender"
            options={["Male", "Female"]}
            placeholder="রোগীর জেন্ডার (ঐচ্ছিক)"
            register={register("gender")}
          />
          <SelectInput
            id="relationship"
            options={["মা", "বাবা", "ভাই", "বোন", "কাজিন", "বন্ধু", "অন্যান্য"]}
            placeholder="আপনি রোগীর কি হোন? (ঐচ্ছিক)"
            register={register("relationship")}
          />
          {!isUrgent && (
            <TextInput
              id="delivery_time"
              placeholder="রক্ত প্রয়োজনের সময় সিলেক্ট করুন"
              type="date"
              register={register("delivery_time", { required: !isUrgent })}
              error={
                !isUrgent &&
                errors.delivery_time &&
                "রক্ত প্রয়োজনের সময় প্রয়োজন"
              }
            />
          )}
          <div className="my-4">
            <label className="cursor-pointer flex items-center gap-x-2">
              <input
                {...register("urgent", { required: false })}
                type="checkbox"
                className="hidden checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
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
          <textarea
            id="description"
            className="block mt-8 w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
            placeholder="বিস্তারিত (ঐচ্ছিক)"
            rows={4}
            {...register("description")}
          />
        </Section>
      </div>
      <Button
        className="w-full"
        type="submit"
        text="সাবমিট"
        isLoading={loading}
      />
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

// SelectInput component
const SelectInput = ({ id, options, placeholder, register, error }) => (
  <>
    <select
      id={id}
      className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
      {...register}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </>
);

// PhoneNumbers component
const PhoneNumbers = ({
  phoneInputCount,
  setPhoneInputCount,
  register,
  errors,
}) => (
  <div className="space-y-4">
    {[...Array(phoneInputCount)].map((_, index) => (
      <div key={index}>
        <div
          className={`flex items-center ${
            phoneInputCount !== 1 && "border-none"
          } border`}
        >
          <input
            type="tel"
            id={`phone${index}`}
            className={`block w-full px-4 py-3 text-base text-gray-500 border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary ${
              phoneInputCount !== 1 && "border"
            }`}
            placeholder={`মোবাইল নাম্বার ${index !== 0 ? index + 1 : ""}`}
            {...register(`mobile_number${index}`, {
              required: index === 0 ? "মোবাইল নাম্বার প্রয়োজন" : false,
              pattern: {
                value: /^\d{11}$|^\d{13}$|^\d{14}$/,
                message: "১১ সংখ্যার মোবাইল নাম্বার দিন",
              },
            })}
          />
          {index === 0 && phoneInputCount < 2 && (
            <Button
              className="m-2 px-4 text-sm py-[10px] whitespace-nowrap"
              text="আরো যোগ করুন"
              onClick={() => setPhoneInputCount(phoneInputCount + 1)}
              icon="/assets/icons/plus.svg"
              iconSize={19}
            />
          )}
        </div>
        {errors[`mobile_number${index}`] && (
          <span className="text-red-500 text-sm">
            {errors[`mobile_number${index}`].message}
          </span>
        )}
      </div>
    ))}
  </div>
);

export default SendRequest;
