import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  ButtonHTMLAttributes,
} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  loading?: boolean,
  disabled?: boolean,
  type?: ButtonHTMLAttributes<string>['type'],
};

export const Button: FC<PropsWithChildren<Props>> = ({
  onClick,
  className,
  loading,
  disabled,
  type = 'button',
  children,
}) => (
  <button
    disabled={disabled}
    onClick={loading ? () => {} : onClick}
    type={type}
    className={cn(styles.button, className)}
  >
    {loading ? 'loading..' : children}
  </button>
);
