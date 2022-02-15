import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { injected } from '../wallet/Connect';
import bscAbi from '../contracts/abi/bsc.json';
import {
  SWAP_BSC_TESTNET_ADDRESS,
  SWAP_RINKEBY_ADDRESS,
} from '../constants';
import rinkebyAbi from '../contracts/abi/rinkeby.json';
import ERC20Abi from '../contracts/abi/erc20.json';

type Methods = {
  methodsSwap: any,
  methodsERC20: any,
};

export const useLoadWeb3 = (address?: string): Methods => {
  console.log('address', address);
  const web3 = useWeb3React();
  const provider = new Web3(Web3.givenProvider);

  let methodsSwap;
  let methodsERC20;

  useEffect(() => {
    async function load() {
      try {
        const isAuthorized = await injected.isAuthorized();
        if (isAuthorized && !web3.active && !web3.error) {
          await web3.activate(injected);
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    load();
  }, [web3]);

  switch (web3.chainId) {
    case 97: {
      // @ts-ignore
      methodsSwap = new provider.eth.Contract(bscAbi, SWAP_BSC_TESTNET_ADDRESS)?.methods;
      if (!address) break;
      // @ts-ignore
      methodsERC20 = new provider.eth.Contract(ERC20Abi, address)?.methods;

      break;
    }

    case 4: {
      // @ts-ignore
      methodsSwap = new provider.eth.Contract(rinkebyAbi, SWAP_RINKEBY_ADDRESS)?.methods;
      if (!address) break;
      // @ts-ignore
      methodsERC20 = new provider.eth.Contract(ERC20Abi, address)?.methods;

      break;
    }

    default:
      methodsSwap = null;
  }

  return {
    methodsSwap,
    methodsERC20,
  };
};
