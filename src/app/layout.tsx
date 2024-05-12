import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { DM_Sans, Do_Hyeon, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// If loading a variable font, you don't need to specify the font weight
const DmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={DmSans.className}>
      <body className="bg-[#070815] text-white">
        <Header />
        {children}
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
