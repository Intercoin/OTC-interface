import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import { useLoadWeb3 } from 'hooks';
import { parseQueryString } from 'utils';
import cn from 'classnames';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';

export const Claim: FC = () => {
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();
  const { pathname } = useLocation();

  const queryParams = parseQueryString(pathname);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<Values>({
    initialValues: {
      ...initialValues,
      hash: queryParams?.tradeHash || '',
    },
    validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onSubmit,
  });

  const {
    values: {
      hash,
      signature,
    },
    handleSubmit,
    handleBlur,
    handleChange,
    isValid,
    touched,
    errors,
    dirty,
  } = formik;

  async function onSubmit() {
    setIsLoading(true);
    let mySignature = queryParams?.signature;

    try {
      if (!mySignature) {
        mySignature = await provider.eth.sign(
          `0x${hash}`,
          web3.account,
        );
      }

      await methodsSwap?.claim(
        `0x${hash}`,
        [signature, mySignature],
      ).send({ from: web3.account });

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  return (
    <Container
      className={styles.container}
      text=''
      title="Claim"
    >

      <form onSubmit={handleSubmit}>
        <div className={cn(styles.inputWrapper, styles.mb)}>
          <Input
            name="signature"
            onChange={handleChange}
            value={signature}
            placeholder="Signature"
            error={touched?.signature && errors?.signature}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            name="hash"
            onChange={handleChange}
            value={hash}
            placeholder="Trade hash"
            error={touched?.hash && errors?.hash}
            onBlur={handleBlur}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!dirty || !isValid}
            className={styles.button}
          >
            Claim
          </Button>
        </div>
      </form>

    </Container>
  );
};
