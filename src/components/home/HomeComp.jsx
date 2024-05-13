import Card from "@/components/home/Card";
import Button from "@/components/ui/Button";
import { bloodGroups, districts } from "@/constants/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeComp() {
    const router = useRouter();
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };
    return (
        <main>
            {/* select boxes  */}

            <div className="flex items-center justify-between gap-x-6 m-6 ">
                <select
                    id="group"
                    className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
                    value={selectedGroup}
                    onChange={handleGroupChange}
                >
                    <option value="">রক্তের গ্রুপ</option>
                    <option value="">All</option>
                    {bloodGroups.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    id="district"
                    className="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500 bg-gray-50 focus:border-primary focus:ring-primary cursor-pointer"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                >
                    <option value="">সকল জেলা</option>
                    {districts.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {/* cards and info  */}

            <div className="mb-auto flex-grow">
                <p className="font-semibold text-center my-8">
                    <span className="text-primary font-bold">১</span> টি{" "}
                    {selectedGroup !== "" && (
                        <span>
                            <span className="text-primary font-bold">{selectedGroup}</span>{" "}
                            রক্তের
                        </span>
                    )}{" "}
                    আবেদন পাওয়া গেছে &quot;
                    {selectedDistrict !== "" ? (
                        <span className="text-primary font-bold">{selectedDistrict}</span>
                    ) : (
                        "সকল"
                    )}
                    &quot; জেলায়
                </p>

                <Card />
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
        </main>
    );
}
