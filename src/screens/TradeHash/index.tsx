import React, { FC, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
// import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Web3 from 'web3';

import {
  Input,
  Button,
  Dropdown,
  Container,
} from 'components';
import { useTradeHash } from 'hooks';
import { copyText } from 'utils/copyText';
import cn from 'classnames';
import { ReactComponent as Check } from 'assets/images/lending/check.svg';
import { validationSchema, initialValues, Values } from './formik-data';
import {
  tokenList,
  networkList,
  // ROUTES,
} from '../../constants';

import styles from './styles.module.scss';

type Props = {
  methods: any,
};

export const TradeHash: FC<Props> = ({ methods }) => {
  const web3 = useWeb3React();
  // const navigate = useNavigate();

  const [copyImgStyles, setCopyImgStyles] = useState<boolean>(false);

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      // if (true) return;
      // navigate(ROUTES.claim);
      setSubmitting(false);
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
    handleSubmit,
    setFieldValue,
    handleBlur,
    handleChange,
    isValid,
    touched,
    errors,
    dirty,
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

  /** handleCopyTradeHash function
   in order to pass it on to the other party
   */
  const handleCopyTradeHash = () => {
    copyText(hash);
    setCopyImgStyles(true);
    setTimeout(() => setCopyImgStyles(false), 1000);
  };

  return (
    <Container
      className={styles.container}
      text=''
      title="Generating trade hash"
    >

      <form onSubmit={handleSubmit}>
        <h4 className={styles.title}>
          Recipient network
        </h4>
        <Dropdown
          value={network}
          name='network'
          options={networkList}
          className={styles.dropdown}
          onChange={(e) => {
            setFieldValue('network', e);
          }}
          onBlur={handleBlur}
          error={touched?.network?.value && errors?.network?.value}
        />

        <Dropdown
          name="token"
          value={token}
          options={tokenList}
          className={styles.dropdown}
          onChange={(e) => {
            setFieldValue('token', e);
          }}
          onBlur={handleBlur}
          error={touched?.token?.value && errors?.token?.value}
        />

        <div className={styles.inputWrapper}>
          <Input
            name="receiverAddress"
            onChange={handleChange}
            value={receiverAddress}
            placeholder="Receiver address"
            onBlur={handleBlur}
            error={touched?.receiverAddress && errors?.receiverAddress}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            name="amount"
            onChange={handleChange}
            value={amount}
            placeholder="Amount"
            onBlur={handleBlur}
            error={touched?.amount && errors?.amount}
          />
        </div>

        <Button
          className={styles.buttonGen}
          onClick={() => handleTradeHash()}
          disabled={!dirty || !!errors?.receiverAddress || !!errors?.amount}
        >
          Generating
        </Button>

        <div className={styles.inputWrapper}>
          <Input
            name="hash"
            disabled
            value={hash}
            placeholder="Trade hash"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.hash && errors?.hash}
          />

          <Button
            className={styles.button}
            onClick={handleCopyTradeHash}
            disabled={!hash}
          >

            <div className={cn(styles.copyText, { [styles.notCopy]: copyImgStyles })}>
              Copy
            </div>

            <Check className={cn(styles.checkImg, { [styles.copy]: copyImgStyles })} />

          </Button>
        </div>

        <Button
          type="submit"
          disabled={!dirty || !isValid}
        >
          Lock
        </Button>
      </form>

    </Container>
  );
};
