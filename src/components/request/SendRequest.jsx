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
const SendRequest = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  // State variables for errors
  const [dateError, setDateError] = useState(null);
  const [groupError, setGroupError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [phoneInputCount, setPhoneInputCount] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(errors).length > 0 && !selectedGroup) {
      setGroupError("রক্তের গ্রুপ নির্বাচন প্রয়োজন");
    } else {
      setGroupError(null);
    }
    if (Object.keys(errors).length > 0 && !selectedDistrict) {
      setDistrictError("জেলা নির্বাচন প্রয়োজন");
    } else {
      setDistrictError(null);
    }
    if (Object.keys(errors).length > 0 && !isUrgent && !date.startDate) {
      setDateError("রক্ত প্রয়োজনের সময় প্রয়োজন");
      setLoading(false);
      return;
    } else if (
      Object.keys(errors).length > 0 &&
      !isUrgent &&
      new Date(date.startDate) < new Date()
    ) {
      setDateError("সঠিক রক্ত প্রয়োজনের সময় প্রয়োজন");
      setLoading(false);
      return;
    } else {
      setGroupError(null);
    }
  }, [date, errors, isUrgent, selectedDistrict, selectedGroup]);

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);

    // Validation for date

    if (!isUrgent && !date.startDate) {
      setDateError("রক্ত প্রয়োজনের সময় প্রয়োজন");
      setLoading(false);
      return;
    }
    // Validation for select fields
    if (!selectedGroup) {
      setGroupError("রক্তের গ্রুপ নির্বাচন প্রয়োজন");
      setLoading(false);
      return;
    }
    if (!selectedDistrict) {
      setDistrictError("জেলা নির্বাচন প্রয়োজন");
      setLoading(false);
      return;
    }
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
      urgent: isUrgent,
      amount_of_blood: Number(data.amount_of_blood),
      hemoglobin_point: parseFloat(data.hemoglobin_point),
      blood_group: selectedGroup.value,
      district: selectedDistrict.value,
    };
    // Add gender and relationship to formattedData only if selectedGender is available
    if (selectedGender) {
      formattedData.gender = selectedGender.value;
    }
    if (selectedRelation) {
      formattedData.relationship = selectedRelation.value;
    }
    if (date.startDate) {
      formattedData.delivery_time = new Date(date.startDate).toISOString();
    }
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
      <div className="overflow-auto small:h-[66vh] h-[545px] pb-[10vh] px-5 lg:px-14 pt-6">
        <p className="text-center text-2xl my-6">
          উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
        </p>

        {/* Primary Info Section */}
        <Section title="প্রাথমিক তথ্য">
          <Select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e)}
            options={bloodGroups}
            isSearchable
            classNames={{
              menuButton: () =>
                `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer`,
              menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
              searchBox:
                "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
              searchIcon: "w-5 h-5 text-gray-500",
              searchContainer:
                "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
              listItem: ({ isSelected }) =>
                `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${
                  isSelected ? "bg-red-400 text-white" : ""
                }`,
            }}
            noOptionsMessage="কোনো অপশন পাওয়া যায় নি"
            searchInputPlaceholder="সার্চ করুন"
            style={{ padding: ".3rem" }}
            placeholder="রক্তের গ্রুপ নির্বাচন করুন"
          />
          {groupError && (
            <span className="text-red-500 text-sm">{groupError}</span>
          )}
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
          <Select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e)}
            options={districts.slice(1, 65)}
            isSearchable
            classNames={{
              menuButton: () =>
                `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer`,
              menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
              searchBox:
                "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
              searchIcon: "w-5 h-5 text-gray-500",
              searchContainer:
                "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
              listItem: ({ isSelected }) =>
                `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${
                  isSelected ? "bg-red-400 text-white" : ""
                }`,
            }}
            noOptionsMessage="কোনো অপশন পাওয়া যায় নি"
            searchInputPlaceholder="সার্চ করুন"
            style={{ padding: ".3rem" }}
            placeholder="জেলা নির্বাচন করুন"
          />
          {districtError && (
            <span className="text-red-500 text-sm">{districtError}</span>
          )}
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
          <Select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e)}
            options={genders}
            isSearchable
            classNames={{
              menuButton: () =>
                `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer`,
              menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
              searchBox:
                "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
              searchIcon: "w-5 h-5 text-gray-500",
              searchContainer:
                "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
              listItem: ({ isSelected }) =>
                `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${
                  isSelected ? "bg-red-400 text-white" : ""
                }`,
            }}
            noOptionsMessage="কোনো অপশন পাওয়া যায় নি"
            searchInputPlaceholder="সার্চ করুন"
            style={{ padding: ".3rem" }}
            placeholder="রোগীর জেন্ডার (ঐচ্ছিক)"
          />
          <Select
            value={selectedRelation}
            onChange={(e) => setSelectedRelation(e)}
            options={relations}
            isSearchable
            classNames={{
              menuButton: () =>
                `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer`,
              menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
              searchBox:
                "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
              searchIcon: "w-5 h-5 text-gray-500",
              searchContainer:
                "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
              listItem: ({ isSelected }) =>
                `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${
                  isSelected ? "bg-red-400 text-white" : ""
                }`,
            }}
            noOptionsMessage="কোনো অপশন পাওয়া যায় নি"
            searchInputPlaceholder="সার্চ করুন"
            style={{ padding: ".3rem" }}
            placeholder="আপনি রোগীর কি হন? (ঐচ্ছিক)"
          />
          <div className="my-4">
            <div className="checkbox-wrapper">
              <input
                id="terms-checkbox-37"
                type="checkbox"
                className="hidden checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
              />
              <label className="terms-label" htmlFor="terms-checkbox-37">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  className="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height={200} width={200} />
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    strokeWidth={40}
                    className="checkbox-box"
                    height={200}
                    width={200}
                  />
                  <path
                    strokeWidth={15}
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  />
                </svg>
                <span className="text-primary mx-2">
                  যত দ্রুত সম্ভব রক্তের প্রয়োজন
                </span>
              </label>
            </div>
          </div>

          {!isUrgent && (
            <>
              <Datepicker
                inputClassName={
                  "w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
                }
                placeholder={"রক্ত প্রয়োজনের সময় সিলেক্ট করুন"}
                useRange={false}
                asSingle={true}
                value={date}
                onChange={(e) => setDate(e)}
                primaryColor={"red"}
                dateLooking="backward"
                startFrom={new Date()}
              />
              {dateError && (
                <span className="text-red-500 text-sm">{dateError}</span>
              )}
            </>
          )}
          <textarea
            id="description"
            className="block mt-8 w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary "
            placeholder="বিস্তারিত (ঐচ্ছিক)"
            rows={4}
            {...register("description")}
          />
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
    {/* Code of new input fields. not working if you don't add required.  */}

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

// PhoneNumber component
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
          } border border-gray-500`}
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
              className="m-2 !px-5 text-sm py-[10px] whitespace-nowrap"
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
