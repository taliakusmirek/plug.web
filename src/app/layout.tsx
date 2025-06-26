import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Mynerve } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mynerve = Mynerve({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mynerve",
});

export const metadata: Metadata = {
  title: "Plug – Your Networking Engine",
  description: "Plug: Your Networking Engine. Built for People Going Places.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mynerve.variable} font-sans bg-[#3B2063] min-h-screen`}>
        {/* Navigation Bar */}
        <nav className="w-full flex items-center justify-between px-16 py-8 bg-[#3B2063]">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Plug logo" width={36} height={36} />
            <div className="text-3xl font-extrabold text-white tracking-tight">Plug</div>
          </div>
          <ul className="flex gap-12 text-lg font-medium">
            <li><a href="#" className="text-white hover:text-[#FFD86B] transition">About</a></li>
            <li><a href="#" className="text-white hover:text-[#FFD86B] transition">Features</a></li>
            <li><a href="#" className="text-white hover:text-[#FFD86B] transition">Pricing</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
