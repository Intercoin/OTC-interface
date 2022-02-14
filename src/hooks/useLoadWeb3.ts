import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { injected } from '../wallet/Connect';
import bscAbi from '../contracts/abi/bsc.json';
import { hwAddressBSC, hwAddressR } from '../constants';
import rinkebyAbi from '../contracts/abi/rinkeby.json';

type Methods = {
  methods: any,
};

export const useLoadWeb3 = (): Methods => {
  const web3 = useWeb3React();
  const provider = new Web3(Web3.givenProvider);

  let methods = () => {};

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
      const contractList = new provider.eth.Contract(bscAbi, hwAddressBSC);
      methods = contractList?.methods;

      break;
    }

    case 4: {
      // @ts-ignore
      const contractList = new provider.eth.Contract(rinkebyAbi, hwAddressR);
      methods = contractList?.methods;

      break;
    }

    default:
      methods = () => {};
  }

  return { methods };
};
