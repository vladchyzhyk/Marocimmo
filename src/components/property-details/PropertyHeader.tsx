import { getPropertyIcons } from '@/utils/getPropertyIcons';
import { FilterTip } from '@/components/filters/FilterTip';
import { formatDeposit, formatSyndicFees } from '@/utils/propertyFormatters';
import type { Property } from '@/utils/mockPropertyDetail';

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  const { basicInfo, pricing } = property;
  const formattedPrice = new Intl.NumberFormat('en-US').format(pricing.price);

  const propertyIconsData = {
    propertyType: basicInfo.propertyType,
    area: basicInfo.area,
    bedrooms: basicInfo.rooms,
    bathrooms: basicInfo.bathrooms,
    location: basicInfo.location.fullAddress,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <span
          className="text-xs font-medium leading-[110%] text-[#222222]
          px-2 h-5 flex items-center justify-center bg-[#FEF9C2] rounded-lg
          "
        >
          {basicInfo.transactionType}
        </span>
        <span
          className="label-sm-medium text-[var(--color-black)]
          px-2 h-5 flex items-center justify-center bg-[#FEF9C2] rounded-lg"
        >
          {basicInfo.propertyType}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="title-xl font-bold leading-[120%] tracking-[-0.02em] text-[#222222]">
          {basicInfo.title}
        </h1>

        <div className="flex items-center gap-2">{getPropertyIcons(propertyIconsData, false)}</div>
      </div>

      <div className="flex flex-col items-start lg:flex-row lg:items-end gap-6">
        <div className="flex items-end gap-1">
          <span className="heading-h3 text-[var(--accent-green)]">
            {formattedPrice} {pricing.currency}
          </span>
          <span className="body-md text-[var(--text-pill)] pb-1">/ {pricing.pricePeriod}</span>
        </div>

        <div className="flex flex-row items-center gap-2 flex-1 flex-wrap">
          {pricing.isNegotiable && <FilterTip text="Negotiable price" className="py-1 px-2 h-7" />}
          <FilterTip
            text={formatDeposit(pricing.deposit.amount, pricing.deposit.period)}
            className="py-1 px-2 h-7"
          />
          <FilterTip
            text={formatSyndicFees(
              pricing.syndicFees.amount,
              pricing.syndicFees.currency,
              pricing.syndicFees.period,
            )}
            className="py-1 px-2 h-7"
          />
        </div>
      </div>
    </div>
  );
}
