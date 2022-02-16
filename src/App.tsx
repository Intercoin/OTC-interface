import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import { ROUTES } from './constants';
import {
  SwitchRole,
  TradeHashCreate,
  PublishCreate,
  TradeHashFollower,
} from './screens';
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
          path={ROUTES.creator.generating}
          element={<TradeHashCreate setTradeHash={setTradeHash} />}
        />

        <Route
          path={ROUTES.creator.publish}
          element={<PublishCreate tradeHash={tradeHash} />}
        />

        <Route
          path={ROUTES.follower.generating}
          element={<TradeHashFollower />}
        />

        <Route
          path={ROUTES.switchRole.root}
          element={<SwitchRole />}
        />

        <Route
          path="*"
          element={<Navigate to={ROUTES.switchRole.root} />}
        />

      </Routes>

    </div>
  );
};

export default App;
