'use client';

import Button from '@/components/ui/Button';
import SelectablePill from '@/components/ui/SelectablePill';
import SelectCard from '@/components/ui/SelectCard';
import {
  ApartmentIcon,
  ArrowNextIcon,
  CommercialIcon,
  HouseIcon,
  LandIcon,
  OfficeIcon,
  VillaIcon,
} from '@/utils/icons';
import classNames from 'classnames';
import React, { useMemo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  status: '' | 'active' | 'pending' | 'expired' | 'archived' | 'draft';
  dealType: '' | 'short-term' | 'long-term' | 'sale';
  propertyTypes: ('apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial')[];
  onChangeStatus: (value: '' | 'active' | 'pending' | 'expired' | 'archived' | 'draft') => void;
  onChangeDealType: (value: '' | 'short-term' | 'long-term' | 'sale') => void;
  onChangePropertyTypes: (
    value: ('apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial')[],
  ) => void;
  onReset: () => void;
  onApply?: (values: {
    status: '' | 'active' | 'pending' | 'expired' | 'archived' | 'draft';
    dealType: '' | 'short-term' | 'long-term' | 'sale';
    propertyTypes: ('apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial')[];
  }) => void;
  resultCount?: number;
  computeCount?: (values: {
    status: '' | 'active' | 'pending' | 'expired' | 'archived' | 'draft';
    dealType: '' | 'short-term' | 'long-term' | 'sale';
    propertyTypes: ('apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial')[];
  }) => number;
};

export type StatusValue = 'all' | 'active' | 'pending' | 'expired' | 'archived' | 'draft';

type TransactionValue = 'all' | 'short-term' | 'long-term' | 'sale';
type PropertyTypeValue = 'apartment' | 'house' | 'villa' | 'office' | 'land' | 'commercial';

const statusOptions: { label: string; value: StatusValue }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Expired', value: 'expired' },
  { label: 'Archived', value: 'archived' },
  { label: 'Draft', value: 'draft' },
];

const transactionOptions: { label: string; value: TransactionValue }[] = [
  { label: 'All deals', value: 'all' },
  { label: 'Short-term Rent', value: 'short-term' },
  { label: 'Long-term Rent', value: 'long-term' },
  { label: 'Sale', value: 'sale' },
];

const propertyTypeOptions: {
  label: string;
  value: PropertyTypeValue;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: 'Apartment', value: 'apartment', Icon: ApartmentIcon },
  { label: 'House', value: 'house', Icon: HouseIcon },
  { label: 'Villa', value: 'villa', Icon: VillaIcon },
  { label: 'Office', value: 'office', Icon: OfficeIcon },
  { label: 'Land', value: 'land', Icon: LandIcon },
  { label: 'Commercial', value: 'commercial', Icon: CommercialIcon },
];

const FilterPopup = ({
  isOpen,
  onClose,
  status,
  dealType,
  propertyTypes,
  onChangeStatus,
  onChangeDealType,
  onChangePropertyTypes,
  onReset,
  onApply,
  resultCount,
  computeCount,
}: Props) => {
  const selectedStatus: StatusValue =
    status === '' ? 'all' : (status as Exclude<StatusValue, 'all'>);
  const selectedTransaction: TransactionValue =
    dealType === '' ? 'all' : (dealType as Exclude<TransactionValue, 'all'>);
  const selectedPropertyTypes: PropertyTypeValue[] = propertyTypes as PropertyTypeValue[];

  const computedCount = useMemo(() => {
    if (computeCount) {
      return computeCount({
        status,
        dealType,
        propertyTypes,
      });
    }
    return resultCount ?? 10;
  }, [computeCount, status, dealType, propertyTypes, resultCount]);

  return (
    <div
      className={classNames(
        'fixed inset-0 bg-white z-[95] flex flex-col transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="sticky top-0 z-[96] bg-white border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-[8px] hover:bg-[var(--bg-tint)] transition-colors duration-300"
            >
              <ArrowNextIcon className="w-5 h-5 text-[var(--color-black)] rotate-180" />
            </button>
            <p>Filter</p>
          </div>
          <Button
            variant="outline"
            size="md"
            fullWidth={false}
            className="!w-auto !bg-[var(--bg-tint)] hover:!bg-white !px-4"
            onClick={onReset}
          >
            Clean
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="title-md text-[var(--color-black)]">Status</h3>
          <div className="flex flex-wrap items-center gap-2">
            {statusOptions.map((opt) => (
              <SelectablePill
                key={opt.value}
                variant="half-square"
                selected={selectedStatus === opt.value}
                onClick={() =>
                  onChangeStatus(
                    opt.value === 'all' ? '' : (opt.value as Exclude<StatusValue, 'all'>),
                  )
                }
                className="!py-2 !px-4"
              >
                {opt.label}
              </SelectablePill>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="title-md text-[var(--color-black)]">Transaction type</h3>
          <div className="flex flex-wrap items-center gap-2">
            {transactionOptions.map((opt) => (
              <SelectablePill
                key={opt.value}
                variant="half-square"
                selected={selectedTransaction === opt.value}
                onClick={() =>
                  onChangeDealType(
                    opt.value === 'all' ? '' : (opt.value as Exclude<TransactionValue, 'all'>),
                  )
                }
                className="!py-2 !px-4"
              >
                {opt.label}
              </SelectablePill>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="title-md text-[var(--color-black)]">Property type</h3>
          <div className="grid grid-cols-3 gap-4">
            {propertyTypeOptions.map((opt) => {
              const isSelected = selectedPropertyTypes.includes(opt.value);
              return (
                <SelectCard
                  key={opt.value}
                  title={opt.label}
                  Icon={opt.Icon}
                  variant="type"
                  selected={isSelected}
                  onClick={() => {
                    const next = isSelected
                      ? (selectedPropertyTypes.filter(
                          (v) => v !== opt.value,
                        ) as PropertyTypeValue[])
                      : ([...selectedPropertyTypes, opt.value] as PropertyTypeValue[]);
                    onChangePropertyTypes(next);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-[96] bg-white border-t border-[var(--border)] px-4 py-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          rightIcon={<ArrowNextIcon className="w-5 h-5" />}
          onClick={() => {
            if (onApply) {
              onApply({
                status,
                dealType,
                propertyTypes,
              });
            }
            onClose();
          }}
          className="!font-medium"
        >
          {`Show ${computedCount} properties`}
        </Button>
      </div>
    </div>
  );
};

export default FilterPopup;
