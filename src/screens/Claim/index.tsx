import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import { useLoadWeb3 } from 'hooks';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';

type Props = {
  backRoute: string,
};

export const Claim: FC<Props> = ({ backRoute }) => {
  const { tradeHash } = useParams();
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<Values>({
    initialValues: {
      ...initialValues,
      hash: tradeHash || '',
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
      const signature = await provider.eth.sign(
        `0x${hash}`,
        web3.account,
      );

      await methodsSwap?.publish(
        `0x${hash}`,
        signature,
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
      backRoute={backRoute}
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
            Claim
          </Button>
        </div>
      </form>

    </Container>
  );
};
