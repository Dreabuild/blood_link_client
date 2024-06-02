import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="group border cursor-pointer hover:bg-[#F4F4F4] transition-all"
      onClick={() => router.push(`/request/${data?.id}`)}
    >
      <div className=" p-5 ">
        <div className="flex items-center justify-between">
          <p className="bg-primary text-white p-3">{data?.blood_group}</p>
          <p className="text-gray-200 font-semibold">#{data.id}</p>
        </div>
        <div className="flex justify-between gap-6 mt-8 ">
          <div>
            <p className="font-medium">
              {data?.hospital_name}
              {", "} {data?.district}
            </p>
            <p className="">{data?.district}</p>
          </div>

          <p className="text-primary font-medium">
            {data?.amount_of_blood} ব্যাগ
          </p>
        </div>
      </div>
      <div className="mt-4 w-12 h-12 bg-red-50 flex items-center justify-center p-2">
        <Link href={`/request/${data?.id}`}>
          {" "}
          <Image
            src="/assets/icons/arrow-up-right.svg"
            alt="Arrow"
            width={24}
            height={24}
            className="group-hover:mb-1 group-hover:ml-1 transition-all"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
