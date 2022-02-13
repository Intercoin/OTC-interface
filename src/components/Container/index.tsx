import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';

import cn from 'classnames';

import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick?: MouseEventHandler,
  loading?: boolean;
  title: string,
  text: string,
  backRoute?: string,
};

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  title,
  text,
  backRoute,
  children,
}) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.header}>

      {
        backRoute ? (
          <Link className={styles.buttonBack} to={backRoute}>
            Back
          </Link>
        ) : null
      }

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.subtitle}>
        {text}
      </div>

    </div>

    <div className={styles.childrenWrapper}>
      {children}
    </div>

  </div>
);
