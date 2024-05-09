import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

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
        <div className="flex flex-col items-center justify-center mx-auto h-screen max-w-[580px]">
          <div className="w-full border-[3px] border-primary h-[670px] relative">
            <div className="flex items-center justify-between p-4 border-b-[3px] border-primary">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={126}
                  height={28}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/assets/icons/WhatsApp.svg"
                  alt="Logo"
                  width={29}
                  height={29}
                />
              </Link>
            </div>
            <div>{children}</div>
          </div>
          <div className="flex items-center justify-between bg-primary w-full mt-6 p-4">
            <p className="font-bold text-white">Download the BloodLink App</p>
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
        <Toaster />
      </body>
    </html>
  );
}
