import {
  WETH_RINKEBY_ADDRESS,
  USDT_RINKEBY_ADDRESS,
  BUSD_BSC_TESTNET_ADDRESS,
} from './hwAddress';

export const TOKEN_LIST_RINKEBY = [
  { value: WETH_RINKEBY_ADDRESS, label: 'WETH' },
  { value: USDT_RINKEBY_ADDRESS, label: 'USDT' },
];

export const TOKEN_LIST_BSC = [
  { value: '', label: 'WETH' },
  { value: BUSD_BSC_TESTNET_ADDRESS, label: 'BUSD' },
];

export const TOKEN_LIST_DEFAULT = [
  { value: '', label: 'Connect the network' },
];
