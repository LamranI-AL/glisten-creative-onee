import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { DM_Sans, Do_Hyeon, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

// If loading a variable font, you don't need to specify the font weight
const dmSans = DM_Sans({
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
    <ClerkProvider>
      <html lang="en" className={dmSans.variable}>
        <body className="grid bg-[#070815] text-white">
          <Header />
          <main>{children}</main>
          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
        </body>
      </html>
    </ClerkProvider>
  );
}
