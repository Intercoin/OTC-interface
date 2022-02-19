import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  loading?: boolean;
  title: string,
  text: string,
};

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  title,
  text,
  children,
}) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.header}>
      <div>
        <div className={styles.title}>
          {title}
        </div>

        <div className={styles.subtitle}>
          {text}
        </div>
      </div>
    </div>

    <div className={styles.childrenWrapper}>
      {children}
    </div>

  </div>
);
