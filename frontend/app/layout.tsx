import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
   title: {
    default: "Oganiru Technologies",
    template: "%s | Oganiru Technologies",
  },
  description: "Engineering progress from Africa, for Africa — and the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-black text-navy antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}