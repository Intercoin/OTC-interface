import React, { FC } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import { Route, Routes, Navigate } from 'react-router';
import { injected } from './wallet/Connect';
import { ROUTES } from './constants';
import {
  Follower,
  Creator,
  WithdrawScreen,
  Main,
} from './screens';

import styles from './styles.module.scss';

const App: FC = () => {
  const web3 = useWeb3React();

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

      <div className={styles.pages}>
        <Routes>
          <Route
            path="creator/*"
            element={<Creator />}
          />

          <Route
            path="follower/*"
            element={<Follower />}
          />

          <Route
            path="withdraw/*"
            element={<WithdrawScreen />}
          />

          <Route path={ROUTES.switchRole} element={<Main />} />

          <Route
            path="*"
            element={<Navigate to={ROUTES.switchRole} />}
          />
        </Routes>
      </div>

    </div>
  );
};

export default App;
