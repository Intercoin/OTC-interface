import keccak256 from 'keccak256';

type Props = {
  network: string,
  chainId: number | undefined,
  fromAddress: string | null | undefined,
  toAddress: string,
  token: string,
  amount: string,
};

/**
 * useTradeHash is a hook to convert data into trade hash
 */

export const useTradeHash = ({
  network,
  chainId,
  fromAddress,
  toAddress,
  token,
  amount,
}: Props) => {
  const tradeString = `${network}${chainId}${fromAddress}${toAddress}${token}${amount}`;

  const tradeHash = keccak256(tradeString).toString('hex');

  return { tradeHash, tradeString };
};
