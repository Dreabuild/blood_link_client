"use client";
import Button from "@/components/ui/Button";
import BloodBankCard from "@/components/bank-home/BloodBankCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "../ui/Loader";
import Image from "next/image";

const BankHomeComp = () => {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getBanks = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/bank`;
        const res = await axios.get(url);
        if (res.status === 200) {
          setBanks(res.data.data);
          setFilteredBanks(res.data.data); // Initialize filtered banks
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getBanks();
  }, []);

  useEffect(() => {
    const results = banks.filter(
      (bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBanks(results);
  }, [searchQuery, banks]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchIconClick = () => {
    const results = banks.filter(
      (bank) =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bank.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBanks(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchIconClick();
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-1 overflow-auto small:h-[57vh] h-[540px] pb-[10vh]">
        <p className="text-primary text-center text-2xl my-6 ">
          সকল ব্লাড ব্যাংক
        </p>
        <div className="flex lg:mx-14 mx-5 mb-6 border border-gray-300 focus-within:border-primary focus-within:ring-primary px-4 py-3 items-center">
          <input
            type="text"
            className="flex-grow text-base text-gray-500 outline-none"
            placeholder="ব্লাড ব্যাংক খুজুন"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <div
            className="flex items-center cursor-pointer"
            onClick={handleSearchIconClick}
          >
            <Image
              src="/assets/icons/search.svg"
              alt="Search Icon"
              width={24}
              height={24}
            />
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : filteredBanks?.length > 0 ? (
          filteredBanks?.map((bank) => (
            <BloodBankCard key={bank?.id} bank={bank} />
          ))
        ) : (
          <div className="flex items-center flex-col ">
            {" "}
            <Image
              src="/assets/404.svg"
              alt="Not Found"
              width={400}
              height={400}
              className="group-hover:scale-90 transition-all"
            />
            <p className="text-primary text-lg font-medium">
              কোনো ডাটা পাওয়া যায় নি
            </p>
          </div>
        )}
      </div>

      {/* buttons */}
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
          icon="/assets/icons/folder.svg"
          iconSize="20"
          text="নতুন আবেদন"
          isHome={true}
          isOutline
          onClick={() => router.push("/request")}
        />
      </div>
    </div>
  );
};

export default BankHomeComp;
