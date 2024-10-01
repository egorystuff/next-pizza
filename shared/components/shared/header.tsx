import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";
import { Container } from "./container";
import { User } from "lucide-react";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, className }) => {
  return (
    <header className={cn("border border-b", className)}>
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

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
