import React, { FC } from 'react';

import styles from './styles.module.scss';

export const Loader: FC = () => (
  <div>
    <div className={styles.loader} />
  </div>
);
