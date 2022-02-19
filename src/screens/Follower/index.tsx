import React, { FC, useEffect, useMemo } from 'react';

import { Navigate, Route, Routes } from 'react-router';

import {
  Claim,
  Publish,
  TradeHashFollower,
} from 'containers';
import { NavTab } from 'components';
import { ROUTES } from '../../constants';

export const Follower: FC = () => {
  const LIST = useMemo(() => (
    [
      {
        name: 'Generating',
        to: ROUTES.creator.generating,
        status: true,
      },
      {
        name: 'Publish',
        to: ROUTES.creator.publish,
        status: true,
      },
      {
        name: 'Claim',
        to: ROUTES.creator.claim,
        status: false,
      },
    ]
  ), []);

  useEffect(() => {
    console.log();
  }, []);

  return (
    <>
      <NavTab tabs={LIST} />

      <Routes>
        <Route
          path="publish/*"
          element={(<Publish nextScreenRoute={ROUTES.follower.claim} />)}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="generating/*"
          element={<TradeHashFollower />}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="claim/*"
          element={<Claim />}
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
