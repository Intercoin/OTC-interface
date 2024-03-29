import React, { FC, useMemo } from 'react';

import { Navigate, Route, Routes } from 'react-router';

import {
  Claim,
  Engage,
  TradeHashFollower,
} from 'containers';
import { NavTab } from 'components';
import { ROUTES } from '../../constants';

export const Follower: FC = () => {
  const LIST = useMemo(() => (
    [
      {
        name: 'Lock',
        to: ROUTES.follower.lock,
        status: true,
      },
      {
        name: 'Engage',
        to: ROUTES.follower.engage,
        status: true,
      },
      {
        name: 'Claim',
        to: ROUTES.follower.claim,
        status: false,
      },
    ]
  ), []);

  return (
    <>
      <NavTab tabs={LIST} />

      <Routes>
        <Route
          path="engage/*"
          element={(<Engage nextScreenRoute={ROUTES.follower.claim} title="Engage(Follower)" />)}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="lock/*"
          element={<TradeHashFollower />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="claim/*"
          element={<Claim title="Claim(Follower)" />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to={ROUTES.switchRole} />}
        />
      </Routes>
    </>
  );
};
