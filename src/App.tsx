import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import { ROUTES } from './constants';
import { TradeHash, Publish } from './screens';
import { injected } from './wallet/Connect';

import styles from './styles.module.scss';

const App = () => {
  const web3 = useWeb3React();

  const [tradeHash, setTradeHash] = useState<string>('');

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
          element={<TradeHash setTradeHash={setTradeHash} />}
        />

        <Route
          path={ROUTES.claim}
          element={<Publish tradeHash={tradeHash} />}
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
