import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

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
                <div className="flex flex-col items-center lg:justify-center mx-auto h-screen  max-w-[580px]">
                    <div className="w-full border-[3px] border-primary small:h-[85vh] h-[670px] relative ">
                        <div className="flex items-center justify-between lg:px-14 px-5 py-4 border-b-[3px] border-primary">
                            <Link href="/">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Logo"
                                    width={126}
                                    height={28}
                                />
                            </Link>
                            <a
                                className=" bg-[#E6F9EA] flex items-center justify-center px-2 py-1 group relative"
                                href="https://whatsapp.com/channel/0029VafBUXv2v1InsGASJv1I"
                                target="_blank"
                            >
                                <Image
                                    src="/assets/icons/WhatsApp.svg"
                                    alt="Arrow"
                                    width={29}
                                    height={29}
                                    className="group-hover:scale-90 transition-all"
                                />
                            </a>
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
