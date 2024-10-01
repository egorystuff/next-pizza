import { Header } from "@/shared/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza | Cart",
  description: "Pizza store",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='min-h-screen bg-[#F4F1EE]'>
      <Header hasSearch={false} className='border-gray-200' />
      {children}
    </main>
  );
}
