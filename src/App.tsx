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
          path={ROUTES.creator.publish.root}
          element={(
            <Publish
              backRoute={ROUTES.creator.generating}
              toRoute={ROUTES.creator.claim.root}
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
          path={ROUTES.creator.claim.root}
          element={<Claim backRoute={ROUTES.creator.publish.root} />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        {/* <Follower /> */}
        <Route path={ROUTES.follower.root}>
          <Route
            path={ROUTES.follower.publish.root}
            element={(
              <Publish
                backRoute={ROUTES.follower.generating}
                toRoute={ROUTES.follower.claim.root}
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
            path={ROUTES.follower.claim.root}
            element={<Claim backRoute={ROUTES.follower.publish.root} />}
          >
            <Route
              path=":tradeHash"
            />
          </Route>

        </Route>

        {/* <Withdraw /> */}
        <Route
          path={ROUTES.withdraw.root}
          element={<Withdraw backRoute={ROUTES.switchRole.root} />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        {/* <SwitchRole /> */}
        <Route path={ROUTES.switchRole.root} element={<SwitchRole />} />

        {/* Redirect */}
        <Route
          path="*"
          element={<Navigate to={ROUTES.switchRole.root} />}
        />
      </Routes>

    </div>
  );
};

export default App;
