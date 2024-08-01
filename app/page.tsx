// 05.24.00.

import { Container, Filters, ProductCard, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className='mt-10 '>
        <Title text='Все пиццы' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />

      <Container className='mt-10 pb-14'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList
                title='Пиццы'
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 4,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 5,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 6,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 7,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 8,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 9,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EF1EB095B2BBDE8E1230BD91995D9D.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                ]}
              />

              <ProductsGroupList
                title='Комбо'
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 2,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 3,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 4,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 5,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 6,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 7,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                  {
                    id: 8,
                    name: "Аррива!",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE796EB06663DFACF37FEF7041EE39.avif",
                    price: 500,
                    items: [{ price: 500 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
