import React, { FC, InputHTMLAttributes } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
};

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  placeholder = '',
  onChange,
  value,
}) => (
  <div className={styles.inputWrapper}>
    <input
      value={value}
      onChange={onChange}
      className={cn(className, styles.input)}
      placeholder={placeholder}
    />
  </div>
);
