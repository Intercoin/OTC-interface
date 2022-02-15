import React, { FC, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Web3 from 'web3';

import {
  Input,
  Button,
  Dropdown,
  Container, InputAmount,
} from 'components';
import { useLoadWeb3, useTradeHash } from 'hooks';
import { copyText } from 'utils/copyText';
import cn from 'classnames';
import { ReactComponent as Check } from 'assets/images/lending/check.svg';
import { validationSchema, initialValues, Values } from './formik-data';
import {
  SWAP_RINKEBY_ADDRESS,
  TOKEN_LIST_DEFAULT,
  TOKEN_LIST_RINKEBY,
  TOKEN_LIST_BSC,
  networkList,
  REGEX,
  ROUTES,
} from '../../constants';

import styles from './styles.module.scss';

type Props = {
  setTradeHash: (tradeHash: string) => void,
};

export const TradeHash: FC<Props> = ({ setTradeHash }) => {
  const web3 = useWeb3React();
  const navigate = useNavigate();

  const [copyImgStyles, setCopyImgStyles] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tokenList = {
    4: TOKEN_LIST_RINKEBY,
    97: TOKEN_LIST_BSC,
  };

  const formik = useFormik<Values>({
    initialValues,
    validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSubmit,
  });

  const { methodsERC20, methodsSwap } = useLoadWeb3(formik.values.token.value);

  async function onSubmit(values, { setSubmitting }) {
    setIsLoading(true);

    try {
      await methodsERC20.approve(
        SWAP_RINKEBY_ADDRESS,
        Web3.utils.toWei(values.amount, 'ether'),
      ).send({ from: web3.account });

      await methodsSwap?.lock(
        `0x${values.hash}`,
        Web3.utils.toWei(values.amount, 'ether'),
        values.token.value,
        values.receiverAddress,
        Web3.utils.toWei('0.1', 'ether'),
      )?.send({ from: web3.account });

      setIsLoading(false);

      navigate(ROUTES.claim);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }

    setSubmitting(false);
  }

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

    await setTradeHash(tradeHash);
    await setFieldValue('hash', tradeHash);
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
          options={web3.chainId ? tokenList[web3.chainId] : TOKEN_LIST_DEFAULT}
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
            onChange={(e) => {
              setFieldValue('receiverAddress', e.target.value.replace(REGEX.onlyLettersAndNumbers, ''));
            }}
            value={receiverAddress}
            placeholder="Receiver address"
            onBlur={handleBlur}
            error={touched?.receiverAddress && errors?.receiverAddress}
          />
        </div>

        <div className={styles.inputWrapper}>
          <InputAmount
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
          isLoading={isLoading}
        >
          Lock
        </Button>
      </form>

    </Container>
  );
};
