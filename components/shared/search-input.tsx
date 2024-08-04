"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDebounce } from "react-use";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((items) => {
        setProducts(items);
      });
    },
    300,
    [searchQuery],
  );

  return (
    <>
      {focused && <div className='fixed top-0 left-0 h-screen w-full bg-black/50 z-30'></div>}

      <div className={cn("flex rounded-2xl flex-1 justify-between relative h-11 z-30", className)}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input
          className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
          type='text'
          placeholder='Поиск...'
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12",
            )}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'>
                <img className='rounded-sm h-8 w-8' src={product.imageUrl} alt={product.name} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
