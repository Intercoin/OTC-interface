import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import { useLoadWeb3 } from 'hooks';
import { ROUTES } from './constants';
import { TradeHash, Claim } from './screens';
import { injected } from './wallet/Connect';

import styles from './styles.module.scss';

const App = () => {
  const web3 = useWeb3React();

  const { methodsSwap } = useLoadWeb3();

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
          element={
            <TradeHash
              methodsSwap={methodsSwap}
            />
          }
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
