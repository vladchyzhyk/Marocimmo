'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import InputSelect from '@/components/ui/InputSelect';
import { FilterDropdown } from './FilterDropdown';

interface BuildingFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
}

const YEAR_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'Less than 1 year', value: 'less-than-1-year' },
  { label: '1–5 years', value: '1-5-years' },
  { label: '6–10 years', value: '6-10-years' },
  { label: '11–20 years', value: '11-20-years' },
  { label: '21+ years', value: '21-plus-years' },
];

const CONDITION_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'New', value: 'new' },
  { label: 'Good', value: 'good' },
  { label: 'Renovated', value: 'renovated' },
  { label: 'Needs renovation', value: 'needs-renovation' },
];

const RENOVATION_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'No renovation', value: 'no-renovation' },
  { label: 'Cosmetic renovation', value: 'cosmetic-renovation' },
  { label: 'Mid-level renovation', value: 'mid-level-renovation' },
  { label: 'Premium renovation', value: 'premium-renovation' },
];

const PROPERTY_CLASS_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'Economic', value: 'economic' },
  { label: 'Mid-range', value: 'mid-range' },
  { label: 'High-end', value: 'high-end' },
];

export const BuildingFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
}: BuildingFilterProps) => {
  const buildingValue = value as
    | {
        year?: string;
        condition?: string;
        renovation?: string;
        propertyClass?: string;
      }
    | undefined;

  const [tempYear, setTempYear] = useState<string>(buildingValue?.year || 'any');
  const [tempCondition, setTempCondition] = useState<string>(buildingValue?.condition || 'any');
  const [tempRenovation, setTempRenovation] = useState<string>(buildingValue?.renovation || 'any');
  const [tempPropertyClass, setTempPropertyClass] = useState<string>(
    buildingValue?.propertyClass || 'any',
  );

  useEffect(() => {
    setTempYear(buildingValue?.year || 'any');
    setTempCondition(buildingValue?.condition || 'any');
    setTempRenovation(buildingValue?.renovation || 'any');
    setTempPropertyClass(buildingValue?.propertyClass || 'any');
  }, [
    buildingValue?.year,
    buildingValue?.condition,
    buildingValue?.renovation,
    buildingValue?.propertyClass,
  ]);

  const applyFilter = (
    year: string,
    condition: string,
    renovation: string,
    propertyClass: string,
  ) => {
    const result: {
      year?: string;
      condition?: string;
      renovation?: string;
      propertyClass?: string;
    } = {};
    if (year !== 'any') result.year = year;
    if (condition !== 'any') result.condition = condition;
    if (renovation !== 'any') result.renovation = renovation;
    if (propertyClass !== 'any') result.propertyClass = propertyClass;
    onChange(Object.keys(result).length > 0 ? result : undefined);
  };

  const handleApply = () => {
    applyFilter(tempYear, tempCondition, tempRenovation, tempPropertyClass);
  };

  const handleYearChange = (value: string) => {
    setTempYear(value);
    if (variant === 'select') {
      applyFilter(value, tempCondition, tempRenovation, tempPropertyClass);
    }
  };

  const handleConditionChange = (value: string) => {
    setTempCondition(value);
    if (variant === 'select') {
      applyFilter(tempYear, value, tempRenovation, tempPropertyClass);
    }
  };

  const handleRenovationChange = (value: string) => {
    setTempRenovation(value);
    if (variant === 'select') {
      applyFilter(tempYear, tempCondition, value, tempPropertyClass);
    }
  };

  const handlePropertyClassChange = (value: string) => {
    setTempPropertyClass(value);
    if (variant === 'select') {
      applyFilter(tempYear, tempCondition, tempRenovation, value);
    }
  };

  const handleClear = () => {
    setTempYear('any');
    setTempCondition('any');
    setTempRenovation('any');
    setTempPropertyClass('any');
    onChange(undefined);
  };

  const hasSelection =
    tempYear !== 'any' ||
    tempCondition !== 'any' ||
    tempRenovation !== 'any' ||
    tempPropertyClass !== 'any';

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Building</h3>
        {hasSelection && (
          <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="body-md text-[var(--color-black)]">Year</label>
          <InputSelect
            value={tempYear}
            onChange={handleYearChange}
            options={YEAR_OPTIONS}
            placeholder="Any"
            size="md"
            variant="outline"
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="body-md text-[var(--color-black)]">Condition</label>
          <InputSelect
            value={tempCondition}
            onChange={handleConditionChange}
            options={CONDITION_OPTIONS}
            placeholder="Any"
            size="md"
            variant="outline"
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="body-md text-[var(--color-black)]">Renovation</label>
          <InputSelect
            value={tempRenovation}
            onChange={handleRenovationChange}
            options={RENOVATION_OPTIONS}
            placeholder="Any"
            size="md"
            variant="outline"
            fullWidth
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="body-md text-[var(--color-black)]">Property Class</label>
          <InputSelect
            value={tempPropertyClass}
            onChange={handlePropertyClassChange}
            options={PROPERTY_CLASS_OPTIONS}
            placeholder="Any"
            size="md"
            variant="outline"
            fullWidth
          />
        </div>
      </div>
    </div>
  );

  const getDisplayValue = () => {
    const parts: string[] = [];
    if (tempYear !== 'any') parts.push(`Year: ${tempYear}`);
    if (tempCondition !== 'any') parts.push(`Condition: ${tempCondition}`);
    if (tempRenovation !== 'any') parts.push(`Renovation: ${tempRenovation}`);
    if (tempPropertyClass !== 'any') parts.push(`Class: ${tempPropertyClass}`);
    return parts.length > 0 ? parts.join(', ') : 'Building';
  };

  if (variant === 'compact') {
    const trigger = (
      <button
        type="button"
        className="flex items-center justify-between w-full min-w-[200px] h-10 px-4 border border-[var(--border)] rounded-lg bg-white hover:bg-[var(--bg-tint)] transition-colors"
      >
        <span
          className={`text-base leading-[140%] truncate ${
            hasSelection ? 'text-[var(--accent-green)]' : 'text-[var(--color-black)]'
          }`}
        >
          {getDisplayValue()}
        </span>
      </button>
    );

    return (
      <FilterDropdown
        trigger={trigger}
        content={content}
        onApply={handleApply}
        onClear={handleClear}
        showActions={false}
        placement="bottom-start"
        className={className}
      />
    );
  }

  return <div className={className}>{content}</div>;
};
