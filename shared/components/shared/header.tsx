"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import { Container } from "./container";
import { User } from "lucide-react";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("paid")) {
      setTimeout(() => {
        toast.success("Заказ оплачён, информация отправлена на почту", { icon: "✅" });
      }, 500);
    }
  }, [searchParams]);

  return (
    <header className={cn(" border-b", className)}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div>
              <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
              <p className='text-sm text-gray-400 leading-3'>It&apos;s the best pizza</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        )}

        <div className='flex items-center gap-3'>
          <Button variant='outline' className='flex items-center gap-1'>
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
