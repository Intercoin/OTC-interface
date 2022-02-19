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
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';

export const Withdraw: FC = () => {
  const web3 = useWeb3React();
  const { methodsSwap } = useLoadWeb3();
  const { search } = useLocation();

  const queryParams = parseQueryString(search);

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

    try {
      await methodsSwap?.withdraw(
        `0x${hash}`,
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
      title="Withdraw"
    >

      <form onSubmit={handleSubmit}>
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
            Withdraw
          </Button>
        </div>
      </form>

    </Container>
  );
};
