import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { ROUTES } from '../../../constants';
import { useLoadWeb3 } from '../../../hooks';

import styles from './styles.module.scss';

export const PublishFollower: FC = () => {
  const { tradeHash } = useParams();
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [partnersTradeHash, setPartnersTradeHash] = useState<string>(tradeHash || '');

  const handleSignTradeHash = async () => {
    setIsLoading(true);

    try {
      const signature2 = await provider.eth.sign(
        `0x${partnersTradeHash}`,
        web3.account,
      );

      await methodsSwap?.publish(
        `0x${partnersTradeHash}`,
        signature2,
      ).send({ from: web3.account });

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Container
      className={styles.container}
      text=''
      title="Publish"
      backRoute={ROUTES.follower.generating}
    >

      <div className={styles.inputWrapper}>
        <Input
          onChange={(e) => setPartnersTradeHash(e.target.value)}
          value={partnersTradeHash}
          placeholder="Trade hash"
        />

        <Button
          isLoading={isLoading}
          className={styles.button}
          onClick={handleSignTradeHash}
        >
          Publish
        </Button>
      </div>

    </Container>
  );
};