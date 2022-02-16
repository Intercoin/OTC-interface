import React, { FC } from 'react';
import Select from 'react-select';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Value = {
  value: any,
  label: string
};

type Props = {
  className?: string,
  name: string,
  error?: string | boolean,
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
  error,
}) => (
  <div className={cn(className, { [styles.error]: !!error })}>
    <Select
      onBlur={onBlur}
      name={name}
      value={value}
      options={options}
      onChange={onChange}
    />
  </div>
);
