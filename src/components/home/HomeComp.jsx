import Card from "@/components/home/Card";
import Button from "@/components/ui/Button";
import { bloodGroups, districts } from "@/constants/data";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function HomeComp() {
    const router = useRouter();
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [requests, setRequests] = useState([]);

    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    useEffect(() => {
        const getBloodRequests = async () => {
            try {
                let url = `${process.env.NEXT_PUBLIC_BASE_URL}/request?`;
                if (selectedGroup) {
                    url += `bloodGroup=${selectedGroup}&`;
                }
                if (selectedDistrict) {
                    url += `district=${selectedDistrict}`;
                }
                const res = await axios.get(url);
                if (res.status === 200) {
                    console.log(res.data.data);
                    setRequests(res.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getBloodRequests();
    }, [selectedGroup, selectedDistrict]);

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

            <div className="mb-auto flex-grow h-[450px] overflow-auto">
                <p className="font-semibold text-center my-8">
                    <span className="text-primary font-bold">{requests.length}</span> টি{" "}
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

                <div className="grid grid-cols-1 gap-y-4 my-6">
                    {requests.map((req) => (
                        <Card key={req?.id} data={req}/>
                    ))}
                </div>
            </div>

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
                />

                <Button
                    className="w-1/2"
                    icon="FiFolderPlus "
                    iconSize="20"
                    text="নতুন আবেদন"
                    isOutline
                    onClick={() => router.push("/request")}
                />
            </div>
        </main>
    );
}