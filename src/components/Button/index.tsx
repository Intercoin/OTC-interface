import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  loading?: boolean;
};

export const Button: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  loading,
  children,
}) => (
  <button
    onClick={loading ? () => {} : onClick}
    type="button"
    className={cn(styles.button, className)}
  >
    {loading ? 'loading..' : children}
  </button>
);
