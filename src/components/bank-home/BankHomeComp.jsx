"use client";
import Button from "@/components/ui/Button";
import BloodBankCard from "@/components/bank-home/BloodBankCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "../ui/Loader";

const BankHomeComp = () => {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBanks = async () => {
      setLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_BASE_URL}/bank`;
        const res = await axios.get(url);
        if (res.status === 200) {
          console.log(res.data.data);
          setBanks(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getBanks();
  }, []);

  console.log(banks);
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-1   overflow-auto small:h-[57vh] h-[540px] pb-[10vh]">
        <p className="text-center text-primary text-xl my-6">
          সকল ব্লাড ব্যাংক
        </p>
        {loading ? (
          <Loader />
        ) : (
          banks?.map((bank) => <BloodBankCard key={bank?.id} bank={bank} />)
        )}
      </div>

      {/* buttons  */}

      <div className="w-full absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <Button
          className="w-1/2"
          style={{ borderRight: "3px solid #BF0000" }}
          icon="/assets/icons/bloodbag.svg"
          iconSize="20"
          text="ব্যাংক হোম"
          isHome={true}
          isOutline
          onClick={() => router.push("/bank-home")}
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
