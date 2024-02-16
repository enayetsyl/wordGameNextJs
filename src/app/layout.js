import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Cards/Navigations/Header";
import Footer from "@/components/Cards/Navigations/Footer";
import { ContextProvider } from "@/lib/GlobalContext/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Convert Image to Text",
  description: "Convert Any Image To Text For Free.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ContextProvider>
      <Toaster position="top-center" />
        <Header />
        <hr className="w-[90%] mx-auto border-[#202020] rounded-full" />
        <div>{children}</div>
        <hr className="w-[90%] mx-auto border-[#202020] rounded-full" />
        <Footer />
      </ContextProvider>
        </body>
    </html>
  );
}
