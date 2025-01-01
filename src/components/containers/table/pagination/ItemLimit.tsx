import { memo } from 'react';

import Dropdown from '@/components/Dropdown';

export type ItemLimitPropType = {
  limit: number;
  onLimitChange: (l: number) => void;
  config?: { label: string; value: string }[];
};

const DefaultLimitOptions = [
  { value: '5', label: '5 items' },
  { value: '10', label: '10 items' },
  { value: '15', label: '15 items' },
  { value: '20', label: '20 items' },
];

export default memo(function ItemLimit({ limit, onLimitChange, config }: ItemLimitPropType) {
  return (
    <Dropdown
      options={config ?? DefaultLimitOptions}
      value={limit.toString()}
      onChange={(value) => onLimitChange(+value)}
    />
  );
});
