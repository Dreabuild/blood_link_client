"use client";
import Button from "@/components/ui/Button";
import BloodBankCard from "@/components/bank-home/BloodBankCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const BankHomeComp = () => {
    const router = useRouter();
    const [banks, setBanks] = useState([]);

      useEffect(() => {
        const getBanks = async () => {
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
        }
        getBanks();
    }, []);
    return (
        <div>
            <div className="grid grid-cols-1 gap-y-4 my-6">
                 {banks.map((bank) => (
                        <BloodBankCard key={bank?.id} data={bank}/>
                    ))}
            </div>

            {/* buttons  */}

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

export default BankHomeComp;
