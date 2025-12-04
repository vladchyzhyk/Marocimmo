'use client';

import { useState, useEffect } from 'react';
import { BaseFilterProps } from './filter-types';
import Toggle from '@/components/Toggle';
import { FilterDropdown } from './FilterDropdown';

interface SpecialConditionFilterProps extends BaseFilterProps {
  variant?: 'compact' | 'select';
  showDisabledAccess?: boolean;
  showPetsAllowed?: boolean;
  showSmokingAllowed?: boolean;
  showNegotiablePrice?: boolean;
  showTouristLicense?: boolean;
  showLoti?: boolean;
  showTitledLand?: boolean;
}

export const SpecialConditionFilter = ({
  value,
  onChange,
  className = '',
  variant = 'select',
  showDisabledAccess = true,
  showPetsAllowed = true,
  showSmokingAllowed = true,
  showNegotiablePrice = false,
  showTouristLicense = false,
  showLoti = false,
  showTitledLand = false,
}: SpecialConditionFilterProps) => {
  const conditionValue = value as
    | {
        disabledAccess?: boolean;
        petsAllowed?: boolean;
        smokingAllowed?: boolean;
        negotiablePrice?: boolean;
        touristLicense?: boolean;
        loti?: boolean;
        titledLand?: boolean;
      }
    | undefined;

  const [tempDisabledAccess, setTempDisabledAccess] = useState<boolean>(
    conditionValue?.disabledAccess || false,
  );
  const [tempPetsAllowed, setTempPetsAllowed] = useState<boolean>(
    conditionValue?.petsAllowed || false,
  );
  const [tempSmokingAllowed, setTempSmokingAllowed] = useState<boolean>(
    conditionValue?.smokingAllowed || false,
  );
  const [tempNegotiablePrice, setTempNegotiablePrice] = useState<boolean>(
    conditionValue?.negotiablePrice || false,
  );
  const [tempTouristLicense, setTempTouristLicense] = useState<boolean>(
    conditionValue?.touristLicense || false,
  );
  const [tempLoti, setTempLoti] = useState<boolean>(conditionValue?.loti || false);
  const [tempTitledLand, setTempTitledLand] = useState<boolean>(
    conditionValue?.titledLand || false,
  );

  useEffect(() => {
    setTempDisabledAccess(conditionValue?.disabledAccess || false);
    setTempPetsAllowed(conditionValue?.petsAllowed || false);
    setTempSmokingAllowed(conditionValue?.smokingAllowed || false);
    setTempNegotiablePrice(conditionValue?.negotiablePrice || false);
    setTempTouristLicense(conditionValue?.touristLicense || false);
    setTempLoti(conditionValue?.loti || false);
    setTempTitledLand(conditionValue?.titledLand || false);
  }, [
    conditionValue?.disabledAccess,
    conditionValue?.petsAllowed,
    conditionValue?.smokingAllowed,
    conditionValue?.negotiablePrice,
    conditionValue?.touristLicense,
    conditionValue?.loti,
    conditionValue?.titledLand,
  ]);

  const applyFilter = (
    disabledAccess: boolean,
    petsAllowed: boolean,
    smokingAllowed: boolean,
    negotiablePrice: boolean,
    touristLicense: boolean,
    loti: boolean,
    titledLand: boolean,
  ) => {
    const result: {
      disabledAccess?: boolean;
      petsAllowed?: boolean;
      smokingAllowed?: boolean;
      negotiablePrice?: boolean;
      touristLicense?: boolean;
      loti?: boolean;
      titledLand?: boolean;
    } = {};
    if (showDisabledAccess && disabledAccess) result.disabledAccess = disabledAccess;
    if (showPetsAllowed && petsAllowed) result.petsAllowed = petsAllowed;
    if (showSmokingAllowed && smokingAllowed) result.smokingAllowed = smokingAllowed;
    if (showNegotiablePrice && negotiablePrice) result.negotiablePrice = negotiablePrice;
    if (showTouristLicense && touristLicense) result.touristLicense = touristLicense;
    if (showLoti && loti) result.loti = loti;
    if (showTitledLand && titledLand) result.titledLand = titledLand;
    onChange(Object.keys(result).length > 0 ? result : undefined);
  };

  const handleApply = () => {
    applyFilter(
      tempDisabledAccess,
      tempPetsAllowed,
      tempSmokingAllowed,
      tempNegotiablePrice,
      tempTouristLicense,
      tempLoti,
      tempTitledLand,
    );
  };

  const handleDisabledAccessChange = (value: boolean) => {
    setTempDisabledAccess(value);
    if (variant === 'select') {
      applyFilter(
        value,
        tempPetsAllowed,
        tempSmokingAllowed,
        tempNegotiablePrice,
        tempTouristLicense,
        tempLoti,
        tempTitledLand,
      );
    }
  };

  const handlePetsAllowedChange = (value: boolean) => {
    setTempPetsAllowed(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        value,
        tempSmokingAllowed,
        tempNegotiablePrice,
        tempTouristLicense,
        tempLoti,
        tempTitledLand,
      );
    }
  };

  const handleSmokingAllowedChange = (value: boolean) => {
    setTempSmokingAllowed(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        tempPetsAllowed,
        value,
        tempNegotiablePrice,
        tempTouristLicense,
        tempLoti,
        tempTitledLand,
      );
    }
  };

  const handleNegotiablePriceChange = (value: boolean) => {
    setTempNegotiablePrice(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        tempPetsAllowed,
        tempSmokingAllowed,
        value,
        tempTouristLicense,
        tempLoti,
        tempTitledLand,
      );
    }
  };

  const handleTouristLicenseChange = (value: boolean) => {
    setTempTouristLicense(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        tempPetsAllowed,
        tempSmokingAllowed,
        tempNegotiablePrice,
        value,
        tempLoti,
        tempTitledLand,
      );
    }
  };

  const handleLotiChange = (value: boolean) => {
    setTempLoti(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        tempPetsAllowed,
        tempSmokingAllowed,
        tempNegotiablePrice,
        tempTouristLicense,
        value,
        tempTitledLand,
      );
    }
  };

  const handleTitledLandChange = (value: boolean) => {
    setTempTitledLand(value);
    if (variant === 'select') {
      applyFilter(
        tempDisabledAccess,
        tempPetsAllowed,
        tempSmokingAllowed,
        tempNegotiablePrice,
        tempTouristLicense,
        tempLoti,
        value,
      );
    }
  };

  const handleClear = () => {
    setTempDisabledAccess(false);
    setTempPetsAllowed(false);
    setTempSmokingAllowed(false);
    setTempNegotiablePrice(false);
    setTempTouristLicense(false);
    setTempLoti(false);
    setTempTitledLand(false);
    onChange(undefined);
  };

  const hasSelection =
    tempDisabledAccess ||
    tempPetsAllowed ||
    tempSmokingAllowed ||
    tempNegotiablePrice ||
    tempTouristLicense ||
    tempLoti ||
    tempTitledLand;

  const content = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="title-sm font-medium text-[var(--color-black)]">Special Condition</h3>
        {hasSelection && (
          <button className="title-sm text-[var(--accent-green)]" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {showDisabledAccess && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Disabled Access</label>
            <Toggle checked={tempDisabledAccess} onChange={handleDisabledAccessChange} />
          </div>
        )}
        {showPetsAllowed && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Pets Allowed</label>
            <Toggle checked={tempPetsAllowed} onChange={handlePetsAllowedChange} />
          </div>
        )}
        {showSmokingAllowed && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Smoking Allowed</label>
            <Toggle checked={tempSmokingAllowed} onChange={handleSmokingAllowedChange} />
          </div>
        )}
        {showNegotiablePrice && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Negotiable price</label>
            <Toggle checked={tempNegotiablePrice} onChange={handleNegotiablePriceChange} />
          </div>
        )}
        {showTouristLicense && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Tourist license</label>
            <Toggle checked={tempTouristLicense} onChange={handleTouristLicenseChange} />
          </div>
        )}
        {showLoti && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Loti</label>
            <Toggle checked={tempLoti} onChange={handleLotiChange} />
          </div>
        )}
        {showTitledLand && (
          <div className="flex items-center justify-between">
            <label className="body-md text-[var(--color-black)]">Titled land</label>
            <Toggle checked={tempTitledLand} onChange={handleTitledLandChange} />
          </div>
        )}
      </div>
    </div>
  );

  const getDisplayValue = () => {
    const parts: string[] = [];
    if (showDisabledAccess && tempDisabledAccess) parts.push('Disabled Access');
    if (showPetsAllowed && tempPetsAllowed) parts.push('Pets Allowed');
    if (showSmokingAllowed && tempSmokingAllowed) parts.push('Smoking Allowed');
    if (showNegotiablePrice && tempNegotiablePrice) parts.push('Negotiable Price');
    if (showTouristLicense && tempTouristLicense) parts.push('Tourist License');
    if (showLoti && tempLoti) parts.push('Loti');
    if (showTitledLand && tempTitledLand) parts.push('Titled Land');
    return parts.length > 0 ? parts.join(', ') : 'Special Condition';
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

