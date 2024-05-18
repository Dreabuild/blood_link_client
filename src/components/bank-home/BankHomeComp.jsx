"use client";
import Button from "@/components/ui/Button";
import BloodBankCard from "@/components/bank-home/BloodBankCard";
import React from "react";
import { useRouter } from "next/navigation";
const BankHomeComp = () => {
    const router = useRouter();
    return (
        <div>
            <div className="mb-auto flex-grow">
                <BloodBankCard />
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
