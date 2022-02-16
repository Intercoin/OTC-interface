import keccak256 from 'keccak256';

type Props = {
  senderChainId: number | undefined,
  recipientChainId: number | undefined,

  senderNetwork: string,
  recipientNetwork: string,

  senderAddress: string,
  recipientAddress: string,

  senderAmount,
  recipientAmount,

  senderToken: string,
  recipientToken: string,

  senderPenalty: string,
  recipientPenalty: string,
};

/**
 * useTradeHash is a hook to convert data into trade hash
 */

export const useTradeHash = ({
  senderChainId,
  recipientChainId,

  senderNetwork,
  recipientNetwork,

  senderAddress,
  recipientAddress,

  senderAmount,
  recipientAmount,

  senderToken,
  recipientToken,

  senderPenalty,
  recipientPenalty,
}: Props) => {
  const timestamp = Date.now();

  const tradeString = `${senderNetwork}${recipientNetwork}
  ${senderChainId}${recipientChainId}
  ${senderAddress}${recipientAddress}
  ${senderToken}${recipientToken}
  ${senderAmount}${recipientAmount}
  ${senderPenalty}${recipientPenalty}
  ${timestamp}`;

  console.log(tradeString);

  const tradeHash = keccak256(tradeString).toString('hex');

  return { tradeHash, tradeString };
};
