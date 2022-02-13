import React, { FC } from 'react';
import Select from 'react-select';

export type Value = {
  value: string,
  label: string
};

type Props = {
  className?: string,
  value: Value,
  options: Value[],
  onChange: (Value) => void,
};

export const Dropdown: FC<Props> = ({
  className,
  value,
  options,
  onChange,
}) => (
  <div className={className}>
    <Select
      value={value}
      options={options}
      onChange={onChange}
    />
  </div>
);
