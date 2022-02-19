import React, { FC } from 'react';

import { Route, Routes } from 'react-router';
import { Withdraw } from 'containers';

export const WithdrawScreen: FC = () => (
  <>
    <Routes>
      <Route
        path="/*"
        element={<Withdraw />}
      >
        <Route
          path=":tradeHash"
        />
      </Route>
    </Routes>
  </>
);
