import React, { FC, useState } from 'react';

import {
  Input,
  Button,
  Container,
} from 'components';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

export const Claim: FC = () => {
  const [partnersTradeHash, setPartnersTradeHash] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');

  return (
    <Container
      className={styles.container}
      text=''
      title="Claim"
      backRoute={ROUTES.root}
    >

      <div className={styles.inputWrapper}>
        <Input
          onChange={(e) => setPartnersTradeHash(e.target.value)}
          value={partnersTradeHash}
          placeholder="Trade hash"
        />

        <Button className={styles.button}>
          Publish
        </Button>
      </div>

      <div className={styles.inputWrapper}>
        <Input
          onChange={(e) => setToAddress(e.target.value)}
          value={toAddress}
          placeholder="Trade hash"
        />

        <Button className={styles.button}>
          Claim
        </Button>
      </div>

    </Container>
  );
};
