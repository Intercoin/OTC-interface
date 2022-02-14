import React, { FC } from 'react';
import Select from 'react-select';

export type Value = {
  value: string,
  label: string
};

type Props = {
  className?: string,
  name: string,
  value: Value,
  options: Value[],
  onChange: (Value) => void,
  onBlur: (Value) => void,
};

export const Dropdown: FC<Props> = ({
  className,
  value,
  options,
  onChange,
  name,
  onBlur,
}) => (
  <div className={className}>
    <Select
      onBlur={onBlur}
      name={name}
      value={value}
      options={options}
      onChange={onChange}
    />
  </div>
);
