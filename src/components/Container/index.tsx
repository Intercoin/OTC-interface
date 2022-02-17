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
  toRouteName?: string,
  toRoute?: string,
  backRoute?: string,
};

export const Container: FC<PropsWithChildren<Props>> = ({
  className,
  title,
  text,
  backRoute,
  toRouteName,
  toRoute,
  children,
}) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.header}>

      {
        backRoute ? (
          <Link className={styles.backRoute} to={backRoute}>
            Back
          </Link>
        ) : null
      }

      <div>
        <div className={styles.title}>
          {title}
        </div>

        <div className={styles.subtitle}>
          {text}
        </div>
      </div>

      {
        toRoute ? (
          <Link className={styles.toRoute} to={toRoute}>
            {toRouteName}
          </Link>
        ) : null
      }

    </div>

    <div className={styles.childrenWrapper}>
      {children}
    </div>

  </div>
);
