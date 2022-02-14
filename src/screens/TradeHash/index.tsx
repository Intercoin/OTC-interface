import React, { FC } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Web3 from 'web3';

import {
  Input,
  Button,
  Dropdown,
  Container,
} from 'components';
import { useTradeHash } from 'hooks';
import { validationSchema, initialValues, Values } from './formik-data';
import { tokenList, networkList, ROUTES } from '../../constants';

import styles from './styles.module.scss';

type Props = {
  methods: any,
};

export const TradeHash: FC<Props> = ({ methods }) => {
  const web3 = useWeb3React();
  const navigate = useNavigate();

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    values: {
      receiverAddress,
      amount,
      hash,
      network,
      token,
    },
    isValid,
    // errors,
    // touched,
    setFieldValue,
    handleBlur,
    handleChange,
  } = formik;

  const handleTradeHash = async () => {
    const { tradeHash } = useTradeHash({
      network: network.value,
      chainId: web3.chainId,
      fromAddress: web3.account,
      toAddress: receiverAddress,
      token: token.value,
      amount,
    });

    await setFieldValue('hash', tradeHash);

    const res = await methods.lock(
      `0x${tradeHash}`,
      Web3.utils.toWei(amount, 'ether'),
      token.value,
      receiverAddress,
      Web3.utils.toWei('0.1', 'ether'),
    ).send({ from: web3.account });

    console.log('method lock', res);
  };

  return (
    <Container
      className={styles.container}
      text=''
      title="Generating trade hash"
    >

      <form onSubmit={formik.handleSubmit}>
        <h4 className={styles.title}>
          Recipient network
        </h4>
        <Dropdown
          value={network}
          name='network'
          options={networkList}
          className={styles.dropdown}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Dropdown
          name="token"
          value={token}
          options={tokenList}
          className={styles.dropdown}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className={styles.inputWrapper}>
          <Input
            name="receiverAddress"
            onChange={handleChange}
            value={receiverAddress}
            placeholder="Receiver address"
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            name="amount"
            onChange={handleChange}
            value={amount}
            placeholder="Amount"
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            name="hash"
            disabled
            value={hash}
            placeholder="Trade hash"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Button
            className={styles.button}
            onClick={() => handleTradeHash()}
          >
            Gen
          </Button>
        </div>

        <Button
          onClick={() => navigate(ROUTES.claim)}
          type="submit"
          disabled={isValid}
        >
          Lock
        </Button>
      </form>

    </Container>
  );
};
