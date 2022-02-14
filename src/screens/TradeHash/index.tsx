import React, { FC, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

import {
  Input,
  Button,
  Dropdown,
  Container,
} from 'components';
import { Value } from 'components/Dropdown';
import { useTradeHash } from 'hooks';
import { tokenList, networkList, ROUTES } from '../../constants';

import styles from './styles.module.scss';

type Props = {
  methods: any,
};

export const TradeHash: FC<Props> = ({ methods }) => {
  const web3 = useWeb3React();
  const navigate = useNavigate();

  const [amount, setAmount] = useState<string>('');
  const [token, setToken] = useState<Value>({ value: 'USDT', label: 'USDT' });
  const [receiverAddress, setReceiverAddress] = useState<string>('');

  const [network, setNetwork] = useState<Value>({ value: 'rinkeby', label: 'Rinkeby' });

  const [uuid, setUuid] = useState<string>('');

  const handleTradeHash = async () => {
    const { tradeHash, tradeString } = useTradeHash({
      network: network.value,
      chainId: web3.chainId,
      fromAddress: web3.account,
      toAddress: receiverAddress,
      token: token.value,
      amount,
      // claimTimeout: ,
      // lockTimeout: ,
    });

    setUuid(tradeHash);
    const w = await methods.lock(
      `0x${tradeHash}`,
      Web3.utils.toWei(amount, 'ether'),
      token.value,
      receiverAddress,
      Web3.utils.toWei('0.1', 'ether'),
    ).call();
    console.log('methods', w);
    console.log('tradeHash', tradeHash);
    console.log('tradeString', tradeString);
  };

  return (
    <Container
      className={styles.container}
      text=''
      title="Generating trade hash"
    >

      <h4 className={styles.title}>
        Recipient network
      </h4>
      <Dropdown
          value={network}
          options={networkList}
          className={styles.dropdown}
          onChange={setNetwork}
      />

      <Dropdown
          value={token}
          options={tokenList}
          className={styles.dropdown}
          onChange={setToken}
      />

      <div className={styles.inputWrapper}>
        <Input
            onChange={(e) => setReceiverAddress(e.target.value)}
            value={receiverAddress}
            placeholder="Receiver address"
          />
      </div>

      <div className={styles.inputWrapper}>
        <Input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Amount"
          />
      </div>

      <div className={styles.inputWrapper}>
        <Input
            disabled
            value={uuid}
            placeholder="Trade hash"
            onChange={() => {}}
          />

        <Button
            className={styles.button}
            onClick={() => handleTradeHash()}
          >
          Gen
        </Button>
      </div>

      <Button onClick={() => navigate(ROUTES.claim)}>
        Lock
      </Button>

    </Container>
  );
};
