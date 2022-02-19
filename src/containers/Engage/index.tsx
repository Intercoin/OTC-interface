import React, { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import { useLoadWeb3 } from 'hooks';
import { parseQueryString, queryString } from 'utils';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';

type Props = {
  nextScreenRoute?: string,
};

export const Engage: FC<Props> = ({
  nextScreenRoute,
}) => {
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();
  const navigate = useNavigate();

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
    let signature = queryParams?.signature;

    try {
      if (!signature) {
        signature = await provider.eth.sign(
          `0x${hash}`,
          web3.account,
        );
      }

      await methodsSwap?.engage(
        `0x${hash}`,
        signature,
      ).send({ from: web3.account });

      navigate(`${nextScreenRoute}/&${queryString({ hashTrade: hash, signature })}`);
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
      title="Engage"
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
            Engage
          </Button>
        </div>
      </form>

    </Container>
  );
};
