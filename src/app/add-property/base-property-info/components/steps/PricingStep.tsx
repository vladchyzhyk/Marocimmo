'use client';

import ToggleCard from '@/components/ToggleCard';
import Input from '@/components/ui/Input';
import InputSelect from '@/components/ui/InputSelect';
import { DatePickerInput } from '@/components/ui/DatePickerInput';
import { useState } from 'react';

type PricingPeriod = 'per month' | 'per week';

type PricingStepValues = {
  price: string;
  pricePeriod: PricingPeriod;
  syndicFees: string;
  syndicFeesPeriod: PricingPeriod;
  deposit: string;
  availableFrom: string; // ISO date (yyyy-mm-dd)
  petsAllowed: boolean;
  smokeAllowed: boolean;
  listingTitle: string;
  description: string;
};

type Props = {
  onDataChange?: (values: PricingStepValues) => void;
  onBack?: () => void;
  initialValues?: Partial<PricingStepValues>;
};

const PricingStep = ({ onDataChange, initialValues }: Props) => {
  const [price, setPrice] = useState<string>(initialValues?.price ?? '');
  const [pricePeriod, setPricePeriod] = useState<PricingPeriod>(
    initialValues?.pricePeriod ?? 'per month',
  );
  const [syndicFees, setSyndicFees] = useState<string>(initialValues?.syndicFees ?? '');
  const [syndicFeesPeriod, setSyndicFeesPeriod] = useState<PricingPeriod>(
    initialValues?.syndicFeesPeriod ?? 'per month',
  );
  const [deposit, setDeposit] = useState<string>(initialValues?.deposit ?? '');
  const [availableFrom, setAvailableFrom] = useState<string>(initialValues?.availableFrom ?? '');
  const [petsAllowed, setPetsAllowed] = useState<boolean>(initialValues?.petsAllowed ?? false);
  const [smokeAllowed, setSmokeAllowed] = useState<boolean>(initialValues?.smokeAllowed ?? false);
  const [listingTitle, setListingTitle] = useState<string>(initialValues?.listingTitle ?? '');
  const [description, setDescription] = useState<string>(initialValues?.description ?? '');

  const titleLimit = 60;
  const descriptionLimit = 4000;

  const updateParentData = () => {
    onDataChange?.({
      price,
      pricePeriod,
      syndicFees,
      syndicFeesPeriod,
      deposit,
      availableFrom,
      petsAllowed,
      smokeAllowed,
      listingTitle,
      description,
    });
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
    updateParentData();
  };

  const handlePricePeriodChange = (value: PricingPeriod) => {
    setPricePeriod(value);
    updateParentData();
  };

  const handleSyndicFeesChange = (value: string) => {
    setSyndicFees(value);
    updateParentData();
  };

  const handleSyndicFeesPeriodChange = (value: PricingPeriod) => {
    setSyndicFeesPeriod(value);
    updateParentData();
  };

  const handleDepositChange = (value: string) => {
    setDeposit(value);
    updateParentData();
  };

  const handleAvailableFromChange = (value: string) => {
    setAvailableFrom(value);
    updateParentData();
  };

  const handlePetsAllowedChange = (value: boolean) => {
    setPetsAllowed(value);
    updateParentData();
  };

  const handleSmokeAllowedChange = (value: boolean) => {
    setSmokeAllowed(value);
    updateParentData();
  };

  const handleListingTitleChange = (value: string) => {
    const v = value.slice(0, titleLimit);
    setListingTitle(v);
    updateParentData();
  };

  const handleDescriptionChange = (value: string) => {
    const v = value.slice(0, descriptionLimit);
    setDescription(v);
    updateParentData();
  };

  return (
    <div className="flex flex-col gap-12 md:gap-10 lg:gap-10 xl:gap-10 w-full min-h-screen md:min-h-fit pb-25 scrollbar-none px-4 md:px-3 lg:px-3 xl:px-0">
      {/* Pricing */}
      <div className="flex flex-col gap-4 md:gap-3 lg:gap-3 xl:gap-3 w-full">
        <div className="flex flex-col gap-1">
          <h2 className="title-xl text-[var(--color-black)]">Pricing</h2>
        </div>

        {/* Row 1: Price, Syndic fees, Deposit + segmented controls */}
        <div className="flex flex-col md:flex-row  gap-4 md:gap-3 lg:gap-3 xl:gap-3 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Input
                id="price"
                label="Price (DH)"
                required
                segmentType="switch"
                segmentOptions={[
                  { label: 'per month', value: 'per month' },
                  { label: 'per week', value: 'per week' },
                ]}
                segmentValue={pricePeriod}
                onSegmentChange={(v) => handlePricePeriodChange(v as PricingPeriod)}
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Input
                id="syndicFees"
                label="Syndic fees (DH)"
                segmentType="switch"
                segmentOptions={[
                  { label: 'per month', value: 'per month' },
                  { label: 'per week', value: 'per week' },
                ]}
                segmentValue={syndicFeesPeriod}
                onSegmentChange={(v) => handleSyndicFeesPeriodChange(v as PricingPeriod)}
                value={syndicFees}
                onChange={(e) => handleSyndicFeesChange(e.target.value)}
                placeholder="Enter fees"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <InputSelect
              id="deposit"
              label="Deposit (DH)"
              value={deposit}
              onChange={handleDepositChange}
              placeholder="No deposit"
              options={[
                { label: 'No deposit', value: 'no_deposit' },
                { label: '1 month', value: '1_month' },
                { label: '2 months', value: '2_months' },
              ]}
            />
          </div>
        </div>

        {/* Row 2: Available from */}
        <div className="flex flex-row gap-4 md:gap-3 lg:gap-3 xl:gap-3 w-full">
          <div className="w-full md:flex-1 flex flex-col gap-2">
            <DatePickerInput
              id="availableFrom"
              label="Available from (date)"
              value={availableFrom}
              onChange={handleAvailableFromChange}
              placeholder="Enter the date"
              required={false}
            />
          </div>
          <div className="hidden md:block md:flex-1" />
          <div className="hidden md:block md:flex-1" />
        </div>
      </div>

      {/* Special Conditions */}
      <div className="flex flex-col gap-6 md:gap-4 lg:gap-4 xl:gap-4 w-full">
        <div className="flex flex-col gap-1">
          <h2 className="hidden md:block title-xl text-[var(--color-black)]">Special Conditions</h2>
          <h2 className="md:hidden title-xl text-[var(--color-black)]">Rules</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-3 lg:gap-3 xl:gap-3 w-full">
          <div className="md:max-w-[12.5rem]">
            <ToggleCard
              label="Pets allowed"
              checked={petsAllowed}
              onChange={handlePetsAllowedChange}
            />
          </div>
          <div className="md:max-w-[12.5rem]">
            <ToggleCard
              label="Smoke allowed"
              checked={smokeAllowed}
              onChange={handleSmokeAllowedChange}
            />
          </div>
        </div>
      </div>

      {/* Describe your property */}
      <div className="flex flex-col gap-6 md:gap-4 lg:gap-4 xl:gap-4 w-full">
        <div className="flex flex-col gap-1">
          <h2 className="title-xl text-[var(--color-black)]">Describe your property</h2>
        </div>

        {/* Listing Title */}
        <div className="flex flex-col gap-2 w-full">
          <Input
            id="listingTitle"
            label="Listing Title"
            required
            value={listingTitle}
            onChange={(e) => handleListingTitleChange(e.target.value)}
            placeholder="Enter a catchy title for your property"
          />
          <div className="flex items-center justify-between w-full">
            <p
              className={`label-sm-medium ${
                listingTitle && listingTitle.trim().length < 10
                  ? 'text-[var(--error)]'
                  : 'text-transparent'
              }`}
            >
              Minimum 10 characters
            </p>
            <p className="label-sm-medium text-[var(--text-body-tint)]">
              {listingTitle.length}/{titleLimit} characters
            </p>
          </div>
        </div>

        {/* Property Description */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="description" className="body-md text-[var(--color-black)]">
              Property Description
              <span className="ml-1 font-medium text-[var(--error)]" aria-hidden>
                *
              </span>
            </label>
            <div className="w-full border border-[var(--border-input)] rounded-lg bg-white px-4 py-4">
              <textarea
                id="description"
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Describe your property, its features, location, and what makes it special..."
                className="w-full min-h-[144px] max-h-[400px] resize-y outline-none body-lg text-[var(--color-black)] placeholder-[var(--text-body-tint)] bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <p
              className={`label-sm-medium ${
                description && description.trim().length < 10
                  ? 'text-[var(--error)]'
                  : 'text-transparent'
              }`}
            >
              Minimum 10 characters
            </p>
            <p className="label-sm-medium text-[var(--text-body-tint)]">
              {description.length}/{descriptionLimit} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
