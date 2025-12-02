'use client';

import { BaseFilterProps } from './filter-types';
import { SafetyFilter } from './SafetyFilter';

const SAFETY_OPTIONS = [
  { label: 'Security system', value: 'security-system' },
  { label: 'Concierge', value: 'concierge' },
  { label: 'Intercom', value: 'intercom' },
  { label: 'Coded lock', value: 'coded-lock' },
  { label: 'Security personnel', value: 'security-personnel' },
];

export const SafetyFilterDesktop = (props: BaseFilterProps) => {
  return <SafetyFilter {...props} options={SAFETY_OPTIONS} variant="compact" />;
};

