//
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { FaPlus } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa";

const banglaFont = Noto_Sans_Bengali({ subsets: ["bengali"] });

export const metadata = {
  title: "Bloodlink",
  description: "Donate your blood.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={banglaFont.className}>
        <NextTopLoader
          color="#BF0000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #BF0000,0 0 5px #BF0000"
        />
        <div className="flex flex-col items-center lg:justify-center mx-auto lg:md:h-[93vh] h-[95vh]  max-w-[580px] lg:md:mb-0 mb-8">
          <div className="w-full border-[3px] border-primary small:h-[85vh] h-[670px] relative ">
            <div className="flex items-center justify-between lg:px-14 px-5 py-4 border-b-[3px] border-primary lg:md:gap-x-4 gap-x-2">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={126}
                  height={28}
                />
              </Link>
              <div className="flex items-center justify-end gap-x-2">
                <a
                  className=" bg-red-50 flex items-center justify-center px-2 py-[7px] lg:py-[10px] group"
                  href="/donor-registration"
                >
                  <FaPlus className="lg:md:text-xl text-[16px] text-primary" />
                  <p className="font-bold text-primary ml-2 lg:md:text-[14px] text-[12px] whitespace-nowrap">
                  ডোনার রেজিস্ট্রেশন
                  </p>
                </a>
                <a
                  className=" bg-red-50 flex items-center justify-center px-4 py-[7px] lg:py-[10px] group"
                  href="mailto:contact@bloodlink.app"
                  target="_blank"
                >
                  <FaRegEnvelope className="lg:md:text-xl text-[16px] text-primary" />

                </a>
              </div>
            </div>
            <div>{children}</div>
          </div>
          <div className="flex items-center justify-between bg-red-400 w-full mt-6 lg:px-6 px-2 py-4">
            <p className="lg:text-base text-xs font-bold text-white">
              ডাউনলোড ব্লাডলিংক অ্যাপ
            </p>
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Image
                  src="/assets/googleplay.png"
                  alt="Logo"
                  width={101}
                  height={36}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/assets/appstore.png"
                  alt="Logo"
                  width={101}
                  height={36}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t-[#BF0000] border-[1px] lg:md:py-[25px] py-[20px] px-2">
          <div className="text-[14px] text-[#BF0000] flex items-center justify-center">
            <Link
              href="https://bloodlinkfoundation.com/"
              className="hover:underline"
            >
              BloodLink Foundation
            </Link>
            <span className="mx-[14px] text-[#333]">|</span>
            <Link
              href="https://bloodlinkfoundation.com/privacy-policy"
              className="hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="mx-[14px] text-[#333]">|</span>
            <Link href="/review" className="hover:underline">
              Review
            </Link>
          </div>
        </div>
        <Toaster />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3308686440715642"
          crossorigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
