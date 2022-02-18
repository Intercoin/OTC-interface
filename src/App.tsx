import React, { FC } from 'react';
import { useWeb3React } from '@web3-react/core';

import { Header } from 'components';
import { Route, Routes, Navigate } from 'react-router';
import {
  Claim,
  Publish,
  TradeHashCreate,
  TradeHashFollower,
  Withdraw,
  SwitchRole,
} from 'screens';
import { injected } from './wallet/Connect';
import { ROUTES } from './constants';

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

      <Routes>
        {/* <Creator /> */}
        <Route
          path={ROUTES.creator.root}
          element={<TradeHashCreate />}
        >
          <Route
            path={ROUTES.creator.generating}
            element={<TradeHashCreate />}
          />
        </Route>

        <Route
          path={ROUTES.creator.publish}
          element={(
            <Publish
              backRoute={ROUTES.creator.generating}
              toRoute={ROUTES.creator.claim}
              toRouteName="Claim"
            />
          )
        }
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path={ROUTES.creator.claim}
          element={<Claim backRoute={ROUTES.creator.publish} />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        {/* <Follower /> */}
        <Route path={ROUTES.follower.root}>
          <Route
            path={ROUTES.follower.publish}
            element={(
              <Publish
                backRoute={ROUTES.follower.generating}
                toRoute={ROUTES.follower.claim}
                toRouteName="Claim"
              />
            )
            }
          >
            <Route
              path=":tradeHash"
            />
          </Route>

          <Route
            path={ROUTES.follower.generating}
            element={<TradeHashFollower />}
          >
            <Route
              path=":tradeHash"
            />
          </Route>

          <Route
            path={ROUTES.follower.claim}
            element={<Claim backRoute={ROUTES.follower.publish} />}
          >
            <Route
              path=":tradeHash"
            />
          </Route>

        </Route>

        {/* <Withdraw /> */}
        <Route
          path={ROUTES.withdraw}
          element={<Withdraw backRoute={ROUTES.switchRole} />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        {/* <SwitchRole /> */}
        <Route path={ROUTES.switchRole} element={<SwitchRole />} />

        {/* Redirect */}
        <Route
          path="*"
          element={<Navigate to={ROUTES.switchRole} />}
        />
      </Routes>

    </div>
  );
};

export default App;
