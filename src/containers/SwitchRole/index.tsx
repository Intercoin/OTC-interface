import React, { FC } from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  Container,
} from 'components';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

export const SwitchRole: FC = () => (
  <Container
      text=''
      title="Switch role"
      className={styles.wrapper}
    >
    <div className={styles.container}>
      <Link to={ROUTES.creator.lock}>
        Creator
      </Link>

      <Link to={ROUTES.follower.lock}>
        Follower
      </Link>
    </div>
  </Container>
);
