'use client';

import { BaseFilterProps } from './filter-types';
import TypePropertySelect from '../TypePropertySelect';
import { PROPERTY_TYPE_OPTIONS } from '@/utils/constants';
import { useSearchParams } from '@/hooks/useSearchParams';
import { PropertyType } from './filters-config';

interface PropertyTypeFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

export const PropertyTypeFilter = ({
  filterId,
  value,
  onChange,
  className = '',
  variant = 'select',
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
      />
    </div>
  );
};
