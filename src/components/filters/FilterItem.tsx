'use client';

import { FilterConfig } from './filters-config';
import { useFilterValue } from '@/hooks/useFilterValue';
import { useIsMobile } from '@/hooks/useIsMobile';

type FilterContext = 'bar' | 'popup';

interface FilterItemProps {
  config: FilterConfig;
  context?: FilterContext;
  className?: string;
}

export const FilterItem = ({ config, context = 'popup', className = '' }: FilterItemProps) => {
  const { value, setValue } = useFilterValue(config.id);
  const isMobile = useIsMobile(768);

  const Component =
    context === 'bar' && !isMobile ? config.components.Desktop : config.components.Mobile;

  return <Component filterId={config.id} value={value} onChange={setValue} className={className} />;
};
