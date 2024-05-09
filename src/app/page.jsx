"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const districts = [
    "কুমিল্লা",
    "ফেনী",
    "ব্রাহ্মণবাড়িয়া",
    "রাঙ্গামাটি",
    "নোয়াখালী",
    "চাঁদপুর",
    "লক্ষ্মীপুর",
    "চট্টগ্রাম",
    "কক্সবাজার",
    "খাগড়াছড়ি",
    "বান্দরবান",
    "সিরাজগঞ্জ",
    "পাবনা",
    "বগুড়া",
    "রাজশাহী",
    "নাটোর",
    "জয়পুরহাট",
    "চাঁপাইনবাবগঞ্জ",
    "নওগাঁ",
    "যশোর",
    "সাতক্ষীরা",
    "মেহেরপুর",
    "নড়াইল",
    "চুয়াডাঙ্গা",
    "কুষ্টিয়া",
    "মাগুরা",
    "খুলনা",
    "বাগেরহাট",
    "ঝিনাইদহ",
    "ঝালকাঠি",
    "পটুয়াখালী",
    "পিরোজপুর",
    "বরিশাল",
    "ভোলা",
    "বরগুনা",
    "সিলেট",
    "মৌলভীবাজার",
    "হবিগঞ্জ",
    "সুনামগঞ্জ",
    "নরসিংদী",
    "গাজীপুর",
    "শরীয়তপুর",
    "নারায়ণগঞ্জ",
    "টাঙ্গাইল",
    "কিশোরগঞ্জ",
    "মানিকগঞ্জ",
    "ঢাকা",
    "মুন্সিগঞ্জ",
    "রাজবাড়ী",
    "মাদারীপুর",
    "গোপালগঞ্জ",
    "ফরিদপুর",
    "পঞ্চগড়",
    "দিনাজপুর",
    "লালমনিরহাট",
    "নীলফামারী",
    "গাইবান্ধা",
    "ঠাকুরগাঁও",
    "রংপুর",
    "কুড়িগ্রাম",
    "শেরপুর",
    "ময়মনসিংহ",
    "জামালপুর",
    "নেত্রকোণা",
  ];

  return (
    <main>
      <div className="flex items-center justify-between gap-x-6 m-6 ">
        <select
          id="large"
          class="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500  bg-gray-50  focus:border-primary focus:ring-primary cursor-pointer"
        >
          <option selected>রক্তের গ্রুপ</option>
          <option value="All">All</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <select
          id="large"
          class="block w-full px-4 py-3 text-base text-gray-500 border border-gray-500  bg-gray-50  focus:border-primary focus:ring-primary cursor-pointer"
        >
          <option selected>সকল জেলা</option>
          {districts.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <p className="font-semibold text-center mt-8">
        <span className="text-primary">0</span> টি আবেদন পাওয়া
        গেছে &quot;সকল&quot; জেলায়
      </p>
      <div className="w-full  absolute bottom-0 border-t-[3px] border-primary flex items-center justify-between">
        <button className="flex items-center gap-x-1 p-3 justify-center border-[2px] border-secondary w-1/2 hover:bg-primary font-bold text-primary hover:text-white transition-all">
          <Image
            src="/assets/icons/bloodbag.svg"
            alt="Logo"
            width={20}
            height={20}
          />
          <span className="">ব্যাংক হোম</span>
        </button>
        <button className="flex items-center gap-x-1 p-3 justify-center w-1/2 hover:bg-primary font-bold text-primary hover:text-white transition-all">
          <Image
            src="/assets/icons/folder.svg"
            alt="Logo"
            width={20}
            height={20}
          />
          <span className="">নতুন আবেদন</span>
        </button>
      </div>
    </main>
  );
}
