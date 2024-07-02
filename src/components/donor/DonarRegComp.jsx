"use client";
import Button from "@/components/ui/Button";
import { bloodGroups, districts, genders } from "@/constants/data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Select from "react-tailwindcss-select";
import Datepicker from "react-tailwindcss-datepicker";

// Form component
const DonarRegComp = () => {
    const [birthDate, setBirthDate] = useState(null);

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    // State variables for errors
    const [dateError, setDateError] = useState(null);
    const [groupError, setGroupError] = useState(null);
    const [districtError, setDistrictError] = useState(null);
    const [loading, setLoading] = useState(false);
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
    }, [birthDate, errors, selectedDistrict, selectedGroup]);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDifference = today.getMonth() - birth.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const age = calculateAge(birthDate);
        if (age < 18) {
            toast.error("আপনার বয়স ১৮ বছরের কম হওয়ায় নিবন্ধন সম্ভব নয়");
            setLoading(false);
            return;
        }

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

        const formattedData = {
            ...data,
            blood_group: selectedGroup.value,
            district: selectedDistrict.value,
            birth_year: new Date(birthDate).toISOString(),
        };
        if (selectedGender) {
            formattedData.gender = selectedGender.value;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/donor`,
                formattedData
            );
            if (res.status === 200 || res.status === 201) {
                toast.success("আবেদনটি সাবমিট করা হয়েছে");
               reset()
            } else {
                console.log("Request submission failed");
            }
        } catch (e) {
            console.log(e);
            toast.error("আবেদনটি সাবমিট করা যায় নি");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="overflow-auto small:h-[66vh] h-[545px] pb-[10vh] px-5 lg:px-14 pt-6">
                <p className="text-center text-2xl my-6">
                    উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
                </p>

                <TextInput
                    id="name"
                    placeholder="আপনার নাম"
                    register={register("name", { required: true })}
                    
                    error={errors.name && "আপনার নাম প্রয়োজন"}
                />
                <Datepicker
                    inputClassName={
                        "w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer "
                    }
                    placeholder={"জন্ম তারিখ"}
                    useRange={false}
                    asSingle={true}
                    value={{ startDate: birthDate, endDate: birthDate }}
                    onChange={(date) => setBirthDate(date.startDate)}
                    primaryColor={"red"}
                    dateLooking="backward"
                    startFrom={new Date()}
                />
                {dateError && (
                    <span className="text-red-500 text-sm">{dateError}</span>
                )}
                <Select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e)}
                    options={bloodGroups}
                    isSearchable
                    classNames={{
                        menuButton: () =>
                            `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer mt-4`,
                        menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
                        searchBox:
                            "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
                        searchIcon: "w-5 h-5 text-gray-500",
                        searchContainer:
                            "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
                        listItem: ({ isSelected }) =>
                            `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${isSelected ? "bg-red-400 text-white" : ""
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

                <Select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e)}
                    options={genders}
                    isSearchable
                    classNames={{
                        menuButton: () =>
                            `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer  my-4`,
                        menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
                        searchBox:
                            "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
                        searchIcon: "w-5 h-5 text-gray-500",
                        searchContainer:
                            "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
                        listItem: ({ isSelected }) =>
                            `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${isSelected ? "bg-red-400 text-white" : ""
                            }`,
                    }}
                    noOptionsMessage="কোনো অপশন পাওয়া যায় নি"
                    searchInputPlaceholder="সার্চ করুন"
                    style={{ padding: ".3rem" }}
                    placeholder="জেন্ডার"
                />
                <TextInput
                    id="street_address"
                    placeholder="স্ট্রিট এড্রেস"
                    register={register("street_address", {
                        required: "স্ট্রিট এড্রেস প্রয়োজন"
                    })}
                    error={errors.street_address && errors.street_address.message}
                    className=""
                />
                <Select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e)}
                    options={districts.slice(1, 65)}
                    isSearchable
                    classNames={{
                        menuButton: () =>
                            `flex w-full px-3 py-1 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer my-4`,
                        menu: "absolute z-10 w-full shadow-lg border border-gray-500 bg-gray-50 py-2 mt-1 text-base",
                        searchBox:
                            "w-full text-sm focus:border-primary focus:ring-0 focus:outline-none",
                        searchIcon: "w-5 h-5 text-gray-500",
                        searchContainer:
                            "flex items-center gap-x-2 text-gray-500 bg-white border border-gray-500 py-2 px-2.5 mx-2.5 mb-2",
                        listItem: ({ isSelected }) =>
                            `block transition duration-200 p-2 hover:bg-red-400 hover:text-white transition-all cursor-pointer select-none truncate ${isSelected ? "bg-red-400 text-white" : ""
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
                    id="phone_number"
                    placeholder="মোবাইল নাম্বার"
                    type="tel"
                    register={register("phone_number", {
                        required: "মোবাইল নাম্বার প্রয়োজন",
                        pattern: {
                            value: /^\d{11}$|^\d{13}$|^\d{14}$/,
                            message: "১১ সংখ্যার নাম্বার দিন",
                        },
                    })}
                    error={errors.phone_number && errors.phone_number.message}
                />
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

// TextInput component
const TextInput = ({ id, placeholder, type = "text", register, error }) => (
    <>
        <input
            type={type}
            id={id}
            className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary mb-4"
            placeholder={placeholder}
            required
            {...register}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </>
);

export default DonarRegComp;
