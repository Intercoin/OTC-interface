import React, { FC, useState } from 'react';

import {
  Input,
  Button,
  Container,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { ROUTES } from '../../../constants';
import { useLoadWeb3 } from '../../../hooks';

import styles from './styles.module.scss';

type Props = {
  tradeHash: string,
};

export const PublishCreate: FC<Props> = ({ tradeHash }) => {
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [partnersTradeHash, setPartnersTradeHash] = useState<string>(tradeHash);

  const handleSignTradeHash = async () => {
    setIsLoading(true);
    // @ts-ignore
    const { ethereum } = window;

    try {
      const signature = await ethereum.request({
        method: 'personal_sign', params: [web3.account, tradeHash],
      });

      await methodsSwap?.publish(
        `0x${tradeHash}`,
        signature,
      ).send({ from: web3.account });

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  console.log(provider);

  // };
  return (
    <Container
      className={styles.container}
      text=''
      title="Publish"
      backRoute={ROUTES.creator.publish}
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
