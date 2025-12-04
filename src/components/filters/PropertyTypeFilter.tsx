'use client';

import TypePropertySelect from '../TypePropertySelect';
import { PROPERTY_TYPE_OPTIONS } from '@/utils/constants';
import { useSearchParams } from '@/hooks/useSearchParams';
import { PropertyType } from './filters-config';

interface PropertyTypeFilterProps {
  className?: string;
}

export const PropertyTypeFilter = ({
  className = '',
}: PropertyTypeFilterProps) => {
  const { searchParams, setSearchParams } = useSearchParams();
  const propertyTypes = (searchParams.propertyTypes || []) as string[];

  const handleChange = (newValue: string[]) => {
    setSearchParams({ propertyTypes: newValue as PropertyType[] });
  };

  return (
    <div className={className}>
      <TypePropertySelect
        options={PROPERTY_TYPE_OPTIONS}
        value={propertyTypes}
        onChange={handleChange}
        placeholder="Type of property"
        className="w-full min-w-[200px] border rounded-[8px] border-[var(--border)]"
        labelClassName="text-[var(--color-black)]"
      />
    </div>
  );
};
