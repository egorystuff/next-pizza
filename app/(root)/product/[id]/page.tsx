import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <PizzaImage imageUrl={product.imageUrl} size={20} />

        <div className='w-[490px] bg-[#FCFCFC] p-7'>
          <Title text={product.name} size='lg' className='font-extrabold' />

          <p className='text-gray-400'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque doloremque nulla nostrum totam quas
            distinctio, alias, sed libero voluptate ratione cum pariatur ad autem quo debitis eligendi, enim asperiores
            ab.
          </p>

          <GroupVariants
            value='2'
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
