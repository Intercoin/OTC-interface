import React from 'react';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';

import { Button, WalletAddress } from 'components';

import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ROUTES } from '../../constants';

import styles from './styles.module.scss';

type Props = {
  account: Web3ReactContextInterface['account'];
  active: Web3ReactContextInterface['active'];
  connect: () => void;
};

export const Header = ({
  account,
  active,
  connect,
}: Props) => {
  const { pathname } = useLocation();

  return (
    <header className={styles.headerWrapper}>

      <div className={styles.header}>

        <div className={styles.navigationWrapper}>
          <div className={styles.logo}>
            OTC
          </div>

          <div className={styles.navigation}>
            <Link
              to={ROUTES.switchRole}
              className={cn(styles.link, { [styles.linkActive]: pathname.includes('role') })}
            >
              Select role
            </Link>
            <Link
              to={ROUTES.withdraw}
              className={cn(styles.link, { [styles.linkActive]: pathname.includes('withdraw') })}
            >
              Withdraw
            </Link>
          </div>
        </div>

        <div className={styles.walletWrapper}>
          {active ?
            <WalletAddress
              wallet={account}
              className={styles.walletAddress}
            /> :
            <Button
              onClick={connect}
              className={styles.walletAddress}
            >
              Connect Wallet
            </Button>
          }
        </div>

      </div>

    </header>
  );
};
