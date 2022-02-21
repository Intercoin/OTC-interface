import React, { FC, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Input,
  Button,
  Container,
  Banner,
} from 'components';
import { useWeb3React } from '@web3-react/core';
import { useFormik } from 'formik';
import { useLoadWeb3 } from 'hooks';
import { parseQueryString, queryString } from 'utils';
import { toast } from 'react-toastify';
import { initialValues, validationSchema, Values } from './formik-data';

import styles from './styles.module.scss';

type Props = {
  nextScreenRoute?: string,
  title?: string,
};

export const Engage: FC<Props> = ({
  nextScreenRoute,
  title,
}) => {
  const web3 = useWeb3React();
  const { provider } = useLoadWeb3();
  const { methodsSwap } = useLoadWeb3();
  const navigate = useNavigate();

  const { search, pathname } = useLocation();

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

      toast.success('Engage successful');

      navigate({
        pathname: nextScreenRoute,
        search: queryString({ tradeHash: hash, signature }),
      });
      setIsLoading(false);
    } catch (e) {
      toast.error('Engage failed');
      setIsLoading(false);
      console.log(e);
    }
  }

  const handleValuesChange = useCallback((values: string) => {
    navigate({
      pathname,
      search: queryString({ tradeHash: values }),
    });
  }, [search]);

  return (
    <Container
      className={styles.container}
      text=''
      title={title || ''}
    >
      <Banner text="Attention: Engage must be called from other participant’s network" />

      <form onSubmit={handleSubmit}>
        <h4 className={styles.title}>
          Trade hash
        </h4>
        <div className={styles.inputWrapper}>
          <Input
            name="hash"
            onChange={(e) => {
              handleChange(e);
              handleValuesChange(e.target.value);
            }}
            value={hash}
            placeholder="Trade hash"
            error={touched?.hash && errors?.hash}
            onBlur={handleBlur}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid}
            className={styles.button}
          >
            Engage
          </Button>
        </div>
      </form>

    </Container>
  );
};
