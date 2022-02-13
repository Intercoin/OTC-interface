import React, {
  useState,
  useEffect,
} from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import {
  ROUTES,
  hwAddressR,
  hwAddressBSC,
} from './constants';
import bscAbi from './contracts/abi/bsc.json';
import rinkebyAbi from './contracts/abi/rinkeby.json';

import { injected } from './wallet/Connect';

import styles from './styles.module.scss';
import { TradeHash, Claim } from './screens';

const App = () => {
  const web3 = useWeb3React();
  const provider = new Web3(Web3.givenProvider);

  const [price, setPrice] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const isAuthorized = await injected.isAuthorized();
        if (isAuthorized && !web3.active && !web3.error) {
          await web3.activate(injected);
        }
      } catch (ex) {
        console.log(ex);
      }

      if (web3.chainId === 97) {
        // @ts-ignore
        const contractList = new provider.eth.Contract(bscAbi, hwAddressBSC);
        setPrice(await contractList?.methods?.name().call());
      }

      if (web3.chainId === 4) {
        // @ts-ignore
        const contractList = new provider.eth.Contract(rinkebyAbi, hwAddressR);
        setPrice(await contractList?.methods?.name().call());
      }
    }

    load();
  }, [web3]);

  console.log('price', price);

  async function connect() {
    try {
      await web3.activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className={styles.main}>

      <Header
        account={web3.account}
        connect={connect}
        active={web3.active}
      />

      <Routes>

        <Route
          path={ROUTES.root}
          element={<TradeHash />}
        />

        <Route
          path={ROUTES.claim}
          element={<Claim />}
        />

        <Route
          path="*"
          element={<Navigate to={ROUTES.root} />}
        />

      </Routes>

    </div>
  );
};

export default App;
