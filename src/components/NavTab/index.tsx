import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';

export type Value = {
  name: string,
  to: string,
  status: boolean,
};

type Props = {
  className?: string,
  tabs: Value[]
};

export const NavTab: FC<Props> = ({ tabs, className }) => (
  <div className={cn(styles.container, className)}>
    {
      tabs.map(({ name, to, status }) => (
        <Link to={to} className={styles.tab}>
          <div className={cn(styles.status, { [styles.active]: status })} />
          {name}
        </Link>
      ))
    }
  </div>
);
