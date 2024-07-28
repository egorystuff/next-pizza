import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroups } from "./checkbox-filters-groups";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Можно собрать' value='1' />
        <FilterCheckbox text='Новинки' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={100} defaultValue={0} />
          <Input type='number' placeholder='100' min={0} max={100} />
        </div>
        <RangeSlider min={0} max={100} step={1} value={[0, 100]} />
      </div>

      <CheckboxFiltersGroups
        className='mt-5'
        title='Ингредиенты'
        limit={4}
        defaultItems={[
          { text: "Сыр", value: "1" },
          { text: "Помидоры", value: "2" },
          { text: "Огурцы", value: "3" },
          { text: "Лук", value: "4" },
          { text: "Салат", value: "5" },
        ]}
        items={[
          { text: "Сыр", value: "1" },
          { text: "Помидоры", value: "2" },
          { text: "Огурцы", value: "3" },
          { text: "Лук", value: "4" },
          { text: "Салат", value: "5" },
          { text: "мед", value: "6" },
        ]}
      />
    </div>
  );
};
