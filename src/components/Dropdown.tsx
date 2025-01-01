import { memo } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from './ui/label';

export type DropdownProps = {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  id?: string;
  type?: 'default' | 'phone';
};

export default memo(function Dropdown({
  id,
  label,
  required = false,
  onChange,
  options,
  value,
  placeholder,
  type = 'default',
}: DropdownProps) {
  return (
    <span className="flex flex-col gap-1">
      {label && (
        <Label className="text-xs text-muted-foreground">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full sm:min-w-[10rem] ${type === 'phone' ? 'max-w-[10rem]' : ''}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent id={id} className={`w-full sm:min-w-[10rem]`}>
          {options.map(({ label, value }) => (
            <SelectItem key={`${value}-${label}`} value={value}>
              {type === 'default' ? label : `(${value}) ${label}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </span>
  );
});
