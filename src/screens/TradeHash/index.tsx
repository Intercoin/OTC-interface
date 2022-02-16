import React, { FC, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Web3 from 'web3';

import {
  Input,
  Button,
  Dropdown,
  Container,
  InputAmount,
} from 'components';
import { useLoadWeb3, useTradeHash } from 'hooks';
import { copyText, defineNetwork } from 'utils';
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

  const { methodsERC20, methodsSwap } = useLoadWeb3(formik.values.recipientToken.value);

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
      recipientNetwork,
      recipientToken,
      recipientAddress,
      recipientAmount,
      recipientPenalty,
      senderToken,
      senderAmount,
      senderPenalty,
      hash,
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

  const handleGeneratingTradeHash = async () => {
    const { networkName } = defineNetwork(web3.chainId);

    const { tradeHash } = useTradeHash({
      senderChainId: web3.chainId,
      recipientChainId: recipientNetwork.value.chainId,

      senderNetwork: networkName,
      recipientNetwork: recipientNetwork.value.name,

      senderAddress: web3.account || '',
      recipientAddress,

      senderAmount,
      recipientAmount,

      senderToken: senderToken.value,
      recipientToken: recipientToken.value,

      senderPenalty,
      recipientPenalty,
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

  const disabledGeneratingTradeHash = useMemo(() => (
    !dirty ||
    !!errors?.recipientAddress ||
    !!errors?.recipientNetwork?.value ||
      !!errors?.recipientToken?.value ||
      !!errors?.recipientAmount ||
      !!errors?.recipientPenalty ||
      !!errors?.senderToken?.value ||
      !!errors?.senderAmount ||
      !!errors?.senderPenalty
  ), [errors, dirty]);

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
          value={recipientNetwork}
          name='recipientNetwork'
          options={networkList}
          className={styles.dropdown}
          onChange={(e) => {
            setFieldValue('recipientNetwork', e);
          }}
          onBlur={handleBlur}
          error={!!touched?.recipientNetwork?.value && !!errors?.recipientNetwork?.value}
        />

        <h4 className={styles.title}>
          Recipient token
        </h4>
        <Dropdown
          name="recipientToken"
          value={recipientToken}
          options={recipientNetwork.value.chainId ? tokenList[recipientNetwork.value.chainId] : TOKEN_LIST_DEFAULT}
          className={styles.dropdown}
          onChange={(e) => {
            setFieldValue('recipientToken', e);
          }}
          onBlur={handleBlur}
          error={!!touched?.recipientToken?.value && !!errors?.recipientToken?.value}
        />

        <div className={styles.inputWrapper}>
          <Input
            name="recipientAddress"
            onChange={(e) => {
              setFieldValue('recipientAddress', e.target.value.replace(REGEX.onlyLettersAndNumbers, ''));
            }}
            value={recipientAddress}
            placeholder="Recipient address"
            onBlur={handleBlur}
            error={touched?.recipientAddress && errors?.recipientAddress}
          />
        </div>

        <div className={styles.inputWrapper}>
          <InputAmount
            name="recipientAmount"
            onChange={handleChange}
            value={recipientAmount}
            placeholder="Recipient amount"
            onBlur={handleBlur}
            error={touched?.recipientAmount && errors?.recipientAmount}
          />
        </div>

        <div className={cn(styles.inputWrapper, styles.mb)}>
          <InputAmount
            name="recipientPenalty"
            onChange={handleChange}
            value={recipientPenalty}
            placeholder="Recipient penalty"
            onBlur={handleBlur}
            error={touched?.recipientPenalty && errors?.recipientPenalty}
          />
        </div>

        <h4 className={styles.title}>
          Your token
        </h4>
        <Dropdown
          name="senderToken"
          value={senderToken}
          options={web3.chainId ? tokenList[web3.chainId] : TOKEN_LIST_DEFAULT}
          className={styles.dropdown}
          onChange={(e) => {
            setFieldValue('senderToken', e);
          }}
          onBlur={handleBlur}
          error={!!touched?.senderToken?.value && !!errors?.senderToken?.value}
        />

        <div className={styles.inputWrapper}>
          <InputAmount
            name="senderAmount"
            onChange={handleChange}
            value={senderAmount}
            placeholder="Your Amount"
            onBlur={handleBlur}
            error={touched?.senderAmount && errors?.senderAmount}
          />
        </div>

        <div className={styles.inputWrapper}>
          <InputAmount
            name="senderPenalty"
            onChange={handleChange}
            value={senderPenalty}
            placeholder="Penalty"
            onBlur={handleBlur}
            error={touched?.senderPenalty && errors?.senderPenalty}
          />
        </div>

        <Button
          className={styles.mb}
          onClick={() => handleGeneratingTradeHash()}
          disabled={disabledGeneratingTradeHash}
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
