import React, { FC, useMemo } from 'react';

import { Navigate, Route, Routes } from 'react-router';

import {
  Claim,
  Engage,
  TradeHashCreate,
} from 'containers';
import { NavTab } from 'components';
import { ROUTES } from '../../constants';

export const Creator: FC = () => {
  const LIST = useMemo(() => (
    [
      {
        name: 'Generating',
        to: ROUTES.creator.generating,
        status: true,
      },
      {
        name: 'Engage',
        to: ROUTES.creator.engage,
        status: true,
      },
      {
        name: 'Claim',
        to: ROUTES.creator.claim,
        status: false,
      },
    ]
  ), []);

  return (
    <>
      <NavTab tabs={LIST} />
      <Routes>
        <Route
          path="generating"
          element={<TradeHashCreate />}
        />

        <Route
          path="engage"
          element={(<Engage nextScreenRoute={ROUTES.creator.claim} title="Engage(Creator)" />)}
        >
          <Route
            path=":tradeHash"
          />
        </Route>

        <Route
          path="claim"
          element={<Claim title="Claim(Creator)" />}
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
