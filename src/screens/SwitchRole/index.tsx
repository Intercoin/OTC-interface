import React, { FC } from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  Container,
} from 'components';
import { useLoadWeb3 } from 'hooks';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

export const SwitchRole: FC = () => {
  const { methodsSwap } = useLoadWeb3();

  async function onSubmit() {
    // setIsLoading(true);

    try {
      const res = await methodsSwap?.transfers(
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        // `0x${28739489237489237489}`,
        '0xb4f54665112c45f917a7e0db890f4a32de2526f9aa50934400da189a54c45d7c',
      ).call();

      console.log('res', res);
      // setIsLoading(false);
    } catch (e) {
      // setIsLoading(false);
      console.log(e);
    }
  }

  return (
    <Container
      text=''
      title="Switch role"
    >
      <div className={styles.container}>
        <button onClick={onSubmit}>
          Check contract
        </button>
        <Link to={ROUTES.creator.generating}>
          Creator
        </Link>

        <Link to={ROUTES.withdraw}>
          Withdraw
        </Link>

        <Link to={ROUTES.follower.generating}>
          Follower
        </Link>
      </div>
    </Container>
  );
};
