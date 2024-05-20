"use client";
import Card from "@/components/home/Card";
import Button from "@/components/ui/Button";
import { bloodGroups, districts } from "@/constants/data";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import Select from "react-tailwindcss-select";

export default function HomeComp() {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGroupChange = (event) => {
    setSelectedGroup(event);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event);
    console.log(selectedDistrict, event);
  };

  useEffect(() => {
    const getBloodRequests = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/request?`;
        url += `${selectedGroup ? `bloodGroup=${selectedGroup.value}&` : ""}`;
        url += `${
          !selectedDistrict || selectedDistrict.value === "সকল"
            ? ""
            : `district=${selectedDistrict.value}`
        }`;
        const res = await axios.get(url);
        if (res.status === 200) {
          console.log(res.data.data);
          setRequests(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getBloodRequests();
  }, [selectedGroup, selectedDistrict]);

  return (
    <main>
      {/* select boxes  */}

      <div className="flex items-center justify-between gap-x-6 my-6 lg:mx-14 mx-5 ">
        <Select
          value={selectedGroup}
          onChange={handleGroupChange}
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
          placeholder="রক্তের গ্রুপ"
        />

        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          options={districts}
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
          placeholder="সকল জেলা"
        />
      </div>

      {/* cards and info  */}
      {loading ? (
        <Loader />
      ) : (
        <div className="mb-auto flex-grow small:h-[45vh] h-[440px] overflow-auto ">
          <p className="font-semibold text-center my-6 lg:mx-14 mx-5">
            <span className="text-primary font-bold">{requests.length}</span> টি{" "}
            {selectedGroup && (
              <span>
                <span className="text-primary font-bold">
                  {selectedGroup.label}
                </span>{" "}
                রক্তের
              </span>
            )}{" "}
            আবেদন পাওয়া গেছে &quot;
            {selectedDistrict ? (
              <span className="text-primary font-bold">
                {selectedDistrict.label}
              </span>
            ) : (
              "সকল"
            )}
            &quot; জেলায়
          </p>

          <div className="grid grid-cols-1 gap-y-4 my-6 lg:mx-14 mx-5">
            {[...requests]?.reverse()?.map((req) => (
              <Card key={req?.id} data={req} />
            ))}
          </div>
        </div>
      )}

      {/* buttons  */}

      <div className="w-full absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <Button
          className="w-1/2"
          style={{ borderRight: "3px solid #BF0000" }}
          icon="LiaHospitalAltSolid"
          iconSize="20"
          text="ব্যাংক হোম"
          isOutline
          onClick={() => router.push("/bank-home")}
          isHome={true}
        />

        <Button
          className="w-1/2"
          icon="FiFolderPlus "
          iconSize="20"
          text="নতুন আবেদন"
          isOutline
          onClick={() => router.push("/request")}
          isHome={true}
        />
      </div>
    </main>
  );
}
